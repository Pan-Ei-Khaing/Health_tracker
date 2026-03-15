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
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    if (!form.weight || !form.height || !form.age) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // Calculate calories
      const calcRes = await fetch('http://localhost:3001/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const calcData = await calcRes.json();

      // Get meal suggestions
      const mealsRes = await fetch(`http://localhost:3001/api/meals/suggestions/${calcData.calories}`);
      const mealsData = await mealsRes.json();

      setPlan({
        calories: calcData.calories,
        meals: mealsData
      });
    } catch (err) {
      console.error('Error:', err);
      // Fallback to local calculation
      const dailyCalories = calculateLocalCalories();
      setPlan({
        calories: dailyCalories,
        meals: {
          breakfast: { name: 'Oatmeal with Banana', calories: Math.round(dailyCalories * 0.25) },
          lunch: { name: 'Grilled Chicken with Rice', calories: Math.round(dailyCalories * 0.35) },
          dinner: { name: 'Fish Soup with Sweet Potato', calories: Math.round(dailyCalories * 0.30) },
          snack: { name: 'Green Tea & Crackers', calories: Math.round(dailyCalories * 0.10) }
        }
      });
    }
    setLoading(false);
  };

  const calculateLocalCalories = () => {
    const bmr = 10 * parseFloat(form.weight) + 6.25 * parseFloat(form.height) - 5 * parseFloat(form.age) + 5;
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725
    };
    let calories = bmr * activityMultipliers[form.activity];
    if (form.goal === 'gain') calories += 500;
    if (form.goal === 'lose') calories -= 500;
    return Math.round(calories);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>📋 Diet Plan Generator</h1>
      
      <div style={{ display: 'grid', gap: '1rem' }}>
        <div>
          <label>Weight (kg) *</label>
          <input
            type="number"
            value={form.weight}
            onChange={(e) => setForm({...form, weight: e.target.value})}
            placeholder="e.g., 70"
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>
        
        <div>
          <label>Height (cm) *</label>
          <input
            type="number"
            value={form.height}
            onChange={(e) => setForm({...form, height: e.target.value})}
            placeholder="e.g., 170"
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>
        
        <div>
          <label>Age *</label>
          <input
            type="number"
            value={form.age}
            onChange={(e) => setForm({...form, age: e.target.value})}
            placeholder="e.g., 30"
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
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light">Light (exercise 1-3 days/week)</option>
            <option value="moderate">Moderate (exercise 3-5 days/week)</option>
            <option value="active">Active (exercise 6-7 days/week)</option>
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
            <option value="gain">Gain Weight (+500 cal)</option>
            <option value="lose">Lose Weight (-500 cal)</option>
          </select>
        </div>

        <button
          onClick={generatePlan}
          disabled={loading}
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
          {loading ? 'Generating...' : 'Generate Plan'}
        </button>
      </div>

      {plan && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f0f8f0', borderRadius: '12px' }}>
          <h2>Your Daily Plan</h2>
          <p><strong>Daily Calories:</strong> {plan.calories}</p>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Based on your weight, height, age, activity level, and goal
          </p>
          
          <h3>Suggested Meals (GERD-Safe):</h3>
          {Object.entries(plan.meals).map(([key, meal]) => (
            <div key={key} style={{ padding: '0.75rem 0', borderBottom: '1px solid #ddd' }}>
              <strong style={{ textTransform: 'capitalize' }}>{key}:</strong> {meal.name} 
              <span style={{ float: 'right', color: '#2c5f2d' }}>{meal.calories} cal</span>
            </div>
          ))}
          
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#fff', borderRadius: '8px' }}>
            <strong>💡 Tips:</strong>
            <ul style={{ margin: '0.5rem 0', paddingLeft: '1.2rem' }}>
              <li>Avoid trigger foods listed in Food Safety Guide</li>
              <li>Eat small portions, don't overeat</li>
              <li>Don't eat within 3 hours of bedtime</li>
              <li>Stay upright after meals</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
