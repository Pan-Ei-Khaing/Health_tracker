require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const port = process.env.PORT || 3001;
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test database connection
pool.query('SELECT NOW()')
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch(err => console.error('❌ Database connection error:', err));

// ==================== ROUTES ====================

// Health check / API info
app.get('/', (req, res) => {
  res.json({
    message: 'Health Tracker backend is running',
    endpoints: {
      users: '/api/users',
      googleLogin: '/api/auth/google',
      foods: '/api/foods',
      searchFoods: '/api/foods/search?q=banana',
      calculateCalories: '/api/calculate',
      mealSuggestions: '/api/meals/suggestions/2000',
      dietPlans: '/api/diet-plans',
      symptoms: '/api/symptoms',
      triggers: '/api/triggers'
    }
  });
});

const publicUserFields = 'user_id, name, email, google_id, avatar_url, auth_provider, created_at, updated_at';

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query(`SELECT ${publicUserFields} FROM users ORDER BY created_at DESC, user_id DESC`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create/register a local user profile
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, avatar_url } = req.body;
    if (!email) return res.status(400).json({ error: 'email is required' });

    const result = await pool.query(
      `INSERT INTO users (name, email, avatar_url, auth_provider)
       VALUES ($1, $2, $3, 'local')
       ON CONFLICT (email) DO UPDATE SET
         name = COALESCE(EXCLUDED.name, users.name),
         avatar_url = COALESCE(EXCLUDED.avatar_url, users.avatar_url),
         updated_at = CURRENT_TIMESTAMP
       RETURNING ${publicUserFields}`,
      [name || null, email, avatar_url || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const result = await pool.query(`SELECT ${publicUserFields} FROM users WHERE user_id = $1`, [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'User not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user profile
app.put('/api/users/:id', async (req, res) => {
  try {
    const { name, email, avatar_url } = req.body;
    const result = await pool.query(
      `UPDATE users SET
         name = COALESCE($1, name),
         email = COALESCE($2, email),
         avatar_url = COALESCE($3, avatar_url),
         updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $4
       RETURNING ${publicUserFields}`,
      [name ?? null, email ?? null, avatar_url ?? null, req.params.id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'User not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING user_id', [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register/login with Google Identity Services credential
app.post('/api/auth/google', async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) return res.status(400).json({ error: 'credential is required' });
    if (!process.env.GOOGLE_CLIENT_ID) return res.status(500).json({ error: 'GOOGLE_CLIENT_ID is not configured on backend' });

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload?.email) return res.status(401).json({ error: 'Google account email not found' });

    const result = await pool.query(
      `INSERT INTO users (name, email, google_id, avatar_url, auth_provider)
       VALUES ($1, $2, $3, $4, 'google')
       ON CONFLICT (email) DO UPDATE SET
         name = EXCLUDED.name,
         google_id = COALESCE(users.google_id, EXCLUDED.google_id),
         avatar_url = EXCLUDED.avatar_url,
         auth_provider = 'google',
         updated_at = CURRENT_TIMESTAMP
       RETURNING ${publicUserFields}`,
      [payload.name || payload.email, payload.email, payload.sub, payload.picture || null]
    );

    res.json({ user: result.rows[0] });
  } catch (err) {
    res.status(401).json({ error: 'Google login failed', details: err.message });
  }
});

// Get all foods
app.get('/api/foods', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM foods ORDER BY food_name');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search foods by name
app.get('/api/foods/search', async (req, res) => {
  try {
    const { q } = req.query;
    const result = await pool.query(
      'SELECT * FROM foods WHERE food_name ILIKE $1 ORDER BY food_name',
      [`%${q}%`]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get food by ID
app.get('/api/foods/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM foods WHERE food_id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Calculate calories
app.post('/api/calculate', async (req, res) => {
  try {
    const { weight, height, age, activity, goal } = req.body;
    
    // BMR calculation (Mifflin-St Jeor)
    let bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    
    // Activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725
    };
    
    let calories = bmr * activityMultipliers[activity];
    
    // Goal adjustment
    if (goal === 'gain') calories += 500;
    if (goal === 'lose') calories -= 500;
    
    res.json({ calories: Math.round(calories) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get meal suggestions based on calories
app.get('/api/meals/suggestions/:calories', async (req, res) => {
  try {
    const { calories } = req.params;
    const breakfast = Math.round(calories * 0.25);
    const lunch = Math.round(calories * 0.35);
    const dinner = Math.round(calories * 0.30);
    const snack = Math.round(calories * 0.10);
    
    res.json({
      breakfast: { calories: breakfast, name: 'Oatmeal with Banana' },
      lunch: { calories: lunch, name: 'Grilled Chicken with Rice' },
      dinner: { calories: dinner, name: 'Fish Soup with Sweet Potato' },
      snack: { calories: snack, name: 'Green Tea & Crackers' }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create diet plan
app.post('/api/diet-plans', async (req, res) => {
  try {
    const { user_id, daily_calories, calories, goal } = req.body;
    if (!user_id) return res.status(400).json({ error: 'user_id is required' });
    if (!daily_calories && !calories) return res.status(400).json({ error: 'daily_calories is required' });

    const result = await pool.query(
      `INSERT INTO diet_plans (user_id, daily_calories, goal)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [user_id, daily_calories || calories, goal || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get diet plans
app.get('/api/diet-plans', async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) return res.status(400).json({ error: 'user_id is required' });

    const result = await pool.query(
      'SELECT * FROM diet_plans WHERE user_id = $1 ORDER BY created_at DESC, plan_id DESC',
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete diet plan
app.delete('/api/diet-plans/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM diet_plans WHERE plan_id = $1 RETURNING *', [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Diet plan not found' });
    res.json({ message: 'Diet plan deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create symptom log
app.post('/api/symptoms', async (req, res) => {
  try {
    const { user_id, symptom, severity, meal, related_meal, stress, stress_level, sleep, sleep_quality, notes, logged_at } = req.body;
    const result = await pool.query(
      `INSERT INTO symptom_logs (user_id, symptom, severity, related_meal, stress_level, sleep_quality, notes, logged_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, COALESCE($8, CURRENT_TIMESTAMP))
       RETURNING *`,
      [user_id || null, symptom, severity, related_meal || meal || null, stress_level || stress || null, sleep_quality || sleep || null, notes || null, logged_at || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get symptom logs
app.get('/api/symptoms', async (req, res) => {
  try {
    const { user_id } = req.query;
    const result = user_id
      ? await pool.query('SELECT * FROM symptom_logs WHERE user_id = $1 ORDER BY logged_at DESC, symptom_id DESC', [user_id])
      : await pool.query('SELECT * FROM symptom_logs ORDER BY logged_at DESC, symptom_id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete symptom log
app.delete('/api/symptoms/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM symptom_logs WHERE symptom_id = $1 RETURNING *', [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Symptom log not found' });
    res.json({ message: 'Symptom log deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create trigger log
app.post('/api/triggers', async (req, res) => {
  try {
    const { user_id, type, trigger_type, name, trigger_name, caused, caused_symptoms, symptom, related_symptom, notes, logged_at } = req.body;
    const result = await pool.query(
      `INSERT INTO trigger_logs (user_id, trigger_type, trigger_name, caused_symptoms, related_symptom, notes, logged_at)
       VALUES ($1, $2, $3, $4, $5, $6, COALESCE($7, CURRENT_TIMESTAMP))
       RETURNING *`,
      [user_id || null, trigger_type || type, trigger_name || name, caused_symptoms || caused || 'Not sure', related_symptom || symptom || null, notes || null, logged_at || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get trigger logs
app.get('/api/triggers', async (req, res) => {
  try {
    const { user_id } = req.query;
    const result = user_id
      ? await pool.query('SELECT * FROM trigger_logs WHERE user_id = $1 ORDER BY logged_at DESC, trigger_id DESC', [user_id])
      : await pool.query('SELECT * FROM trigger_logs ORDER BY logged_at DESC, trigger_id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete trigger log
app.delete('/api/triggers/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM trigger_logs WHERE trigger_id = $1 RETURNING *', [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Trigger log not found' });
    res.json({ message: 'Trigger log deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== START SERVER ====================
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
