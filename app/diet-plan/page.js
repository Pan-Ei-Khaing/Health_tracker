'use client';
import { useState } from 'react';

export default function DietPlan() {
  const [form, setForm] = useState({
    weight: '',
    height: '',
    age: '',
    activity: 'moderate',
    goal: 'maintain'
  });
  const [plan, setPlan] = useState(null);

  const calculateCalories = () => {
    // BMR calculation (Mifflin-St Jeor)
    const bmr = 10 * form.weight + 6.25 * form.height - 5 * form.age + 5;
    
    // Activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725
    };
    
    let calories = bmr * activityMultipliers[form.activity];
    
    // Goal adjustment
    if (form.goal === 'gain') calories += 500;
    if (form.goal === 'lose') calories -= 500;
    
    return Math.round(calories);
  };

  const generatePlan = () => {
    const dailyCalories = calculateCalories();
    
    setPlan({
      calories: dailyCalories,
      meals: {
        breakfast: { name: 'Oatmeal with Banana', calories: Math.round(dailyCalories * 0.25) },
        lunch: { name: 'Grilled Chicken with Rice', calories: Math.round(dailyCalories * 0.35) },
        dinner: { name: 'Fish Soup with Sweet Potato', calories: Math.round(dailyCalories * 0.30) },
        snack: { name: 'Green Tea & Crackers', calories: Math.round(dailyCalories * 0.10) }
      }
    });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>📋 Diet Plan Generator</h1>
      
      <div style={{ display: 'grid', gap: '1rem' }}>
        <div>
          <label>Weight (kg)</label>
          <input
            type="number"
            value={form.weight}
            onChange={(e) => setForm({...form, weight: e.target.value})}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>
        
        <div>
          <label>Height (cm)</label>
          <input
            type="number"
            value={form.height}
            onChange={(e) => setForm({...form, height: e.target.value})}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>
        
        <div>
          <label>Age</label>
          <input
            type="number"
            value={form.age}
            onChange={(e) => setForm({...form, age: e.target.value})}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>
        
        <div>
          <label>Activity Level</label>
          <select
            value={form.activity}
            onChange={(e) => setForm({...form, activity: e.target.value})}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          >
            <option value="sedentary">Sedentary (little exercise)</option>
            <option value="light">Light (1-3 days/week)</option>
            <option value="moderate">Moderate (3-5 days/week)</option>
            <option value="active">Active (6-7 days/week)</option>
          </select>
        </div>
        
        <div>
          <label>Goal</label>
          <select
            value={form.goal}
            onChange={(e) => setForm({...form, goal: e.target.value})}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          >
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Gain Weight</option>
            <option value="lose">Lose Weight</option>
          </select>
        </div>

        <button
          onClick={generatePlan}
          style={{
            padding: '1rem',
            backgroundColor: '#2c5f2d',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Generate Plan
        </button>
      </div>

      {plan && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f0f8f0', borderRadius: '12px' }}>
          <h2>Your Daily Plan</h2>
          <p><strong>Daily Calories:</strong> {plan.calories}</p>
          
          <h3>Suggested Meals:</h3>
          {Object.entries(plan.meals).map(([key, meal]) => (
            <div key={key} style={{ padding: '0.5rem 0', borderBottom: '1px solid #ddd' }}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {meal.name} ({meal.calories} cal)
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
