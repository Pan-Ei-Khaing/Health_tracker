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

  const generatePlan = () => {
    if (!form.weight || !form.height || !form.age) {
      alert('Please fill in all fields');
      return;
    }

    // Calculate calories (Mifflin-St Jeor)
    let bmr = 10 * parseFloat(form.weight) + 6.25 * parseFloat(form.height) - 5 * parseFloat(form.age) + 5;
    
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725
    };
    
    let calories = bmr * activityMultipliers[form.activity];
    
    if (form.goal === 'gain') calories += 500;
    if (form.goal === 'lose') calories -= 500;
    
    const dailyCalories = Math.round(calories);

    setPlan({
      calories: dailyCalories,
      bmr: Math.round(bmr),
      meals: {
        breakfast: { name: 'Oatmeal with Banana + Honey', calories: Math.round(dailyCalories * 0.25), foods: ['Oatmeal', 'Banana', 'Honey'] },
        lunch: { name: 'Grilled Chicken with White Rice', calories: Math.round(dailyCalories * 0.35), foods: ['Chicken Breast', 'White Rice', 'Green Vegetables'] },
        dinner: { name: 'Baked Salmon with Sweet Potato', calories: Math.round(dailyCalories * 0.30), foods: ['Salmon', 'Sweet Potato', 'Zucchini'] },
        snack: { name: 'Plain Yogurt with Papaya', calories: Math.round(dailyCalories * 0.10), foods: ['Yogurt', 'Papaya'] }
      }
    });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c5f2d' }}>📋 Diet Plan Generator</h1>
      
      <div style={{ display: 'grid', gap: '1rem', backgroundColor: '#f5f5f5', padding: '1.5rem', borderRadius: '12px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem' }}>Weight (kg) *</label>
          <input
            type="number"
            value={form.weight}
            onChange={(e) => setForm({...form, weight: e.target.value})}
            placeholder="e.g., 70"
            style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '2px solid #ccc', borderRadius: '8px' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem' }}>Height (cm) *</label>
          <input
            type="number"
            value={form.height}
            onChange={(e) => setForm({...form, height: e.target.value})}
            placeholder="e.g., 170"
            style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '2px solid #ccc', borderRadius: '8px' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem' }}>Age *</label>
          <input
            type="number"
            value={form.age}
            onChange={(e) => setForm({...form, age: e.target.value})}
            placeholder="e.g., 30"
            style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '2px solid #ccc', borderRadius: '8px' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem' }}>Activity Level</label>
          <select
            value={form.activity}
            onChange={(e) => setForm({...form, activity: e.target.value})}
            style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '2px solid #ccc', borderRadius: '8px' }}
          >
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light">Light (exercise 1-3 days/week)</option>
            <option value="moderate">Moderate (exercise 3-5 days/week)</option>
            <option value="active">Active (exercise 6-7 days/week)</option>
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem' }}>Goal</label>
          <select
            value={form.goal}
            onChange={(e) => setForm({...form, goal: e.target.value})}
            style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '2px solid #ccc', borderRadius: '8px' }}
          >
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Gain Weight (+500 cal/day)</option>
            <option value="lose">Lose Weight (-500 cal/day)</option>
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
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}
        >
          Generate Plan
        </button>
      </div>

      {plan && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f0fdf4', borderRadius: '12px', border: '3px solid #22c55e' }}>
          <h2 style={{ color: '#2c5f2d', marginTop: 0 }}>Your Daily Plan</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#fff', borderRadius: '8px' }}>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Your BMR</p>
              <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#2c5f2d' }}>{plan.bmr} cal</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#fff', borderRadius: '8px' }}>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Daily Target</p>
              <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#2c5f2d' }}>{plan.calories} cal</p>
            </div>
          </div>

          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            {form.goal === 'gain' ? '📈 To gain weight, add 500 calories daily' : 
             form.goal === 'lose' ? '📉 To lose weight, reduce 500 calories daily' : 
             '⚖️ To maintain current weight'}
          </p>
          
          <h3 style={{ color: '#2c5f2d' }}>Suggested Meals (GERD-Safe):</h3>
          
          {Object.entries(plan.meals).map(([key, meal]) => (
            <div key={key} style={{ padding: '1rem', marginBottom: '0.5rem', backgroundColor: '#fff', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ textTransform: 'capitalize', color: '#2c5f2d' }}>{key}</strong>
                <span style={{ backgroundColor: '#22c55e', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.9rem' }}>
                  {meal.calories} cal
                </span>
              </div>
              <p style={{ margin: '0.5rem 0 0 0' }}>{meal.name}</p>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#666' }}>
                Includes: {meal.foods.join(', ')}
              </p>
            </div>
          ))}
          
          <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#fff', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c5f2d' }}>💡 GERD Diet Tips:</h4>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#666' }}>
              <li>Avoid trigger foods - check Food Safety Guide</li>
              <li>Eat small portions, don't overeat</li>
              <li>Don't eat within 3 hours of bedtime</li>
              <li>Stay upright after meals (30 min)</li>
              <li>Drink water between meals, not with meals</li>
              <li>Cook foods by baking, steaming, or grilling (not frying)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
