require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3001;

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

// ==================== START SERVER ====================
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
