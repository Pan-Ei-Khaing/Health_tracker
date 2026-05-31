'use client';
import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import AuthRequired from '../components/AuthRequired';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const plans = {
  gerd: {
    breakfast: ['Oatmeal with banana', 'Rice porridge with egg white'],
    lunch: ['Grilled chicken with white rice and carrots', 'Steamed fish with rice'],
    dinner: ['Pumpkin soup with rice crackers', 'Baked fish with potato'],
    snack: ['Plain low-fat yogurt', 'Small unsalted sunflower seed portion with papaya'],
    tips: ['Choose low-fat meals', 'Keep seeds and nuts to small unsalted portions because fat can trigger GERD', 'Avoid coffee, chili, tomato, fried foods, chocolate, alcohol, and mint', 'Eat smaller meals and avoid eating within 3 hours of bedtime'],
  },
  ibs: {
    breakfast: ['Rice porridge with banana', 'Oatmeal with lactose-free milk'],
    lunch: ['Chicken rice without onion/garlic', 'Rice noodles with egg and cucumber'],
    dinner: ['Fish soup with rice', 'Firm tofu with rice and carrots'],
    snack: ['Rice crackers', 'Pumpkin seeds or sunflower seeds (1 tbsp)'],
    tips: ['Start with low-FODMAP style meals', 'Use small portions for edible seeds and nuts, and track tolerance', 'Limit onion, garlic, beans, high-fat food, and carbonated drinks', 'Track personal tolerance because IBS triggers differ by person'],
  },
  both: {
    breakfast: ['Plain rice congee with banana', 'Oatmeal with papaya'],
    lunch: ['Steamed fish with white rice and cucumber', 'Mild chicken rice without chili/onion/garlic'],
    dinner: ['Clear chicken soup with rice noodles', 'Pumpkin soup with egg white'],
    snack: ['Rice crackers', 'Soaked chia seeds (1 tsp) with papaya'],
    tips: ['Keep meals mild, low-fat, and non-spicy', 'For seeds/nuts, choose tiny unsalted portions such as sunflower, pumpkin, chia, flax, or sesame and track tolerance', 'Avoid caffeine, carbonated drinks, chili, onion, garlic, tomato, and fried foods', 'Use the symptom tracker to personalize the plan'],
  },
};

export default function DietPlan() {
  const [form, setForm] = useState({ condition: 'both', weight: '', height: '', age: '', activity: 'moderate', goal: 'maintain', preference: 'normal', avoid: '' });
  const [plan, setPlan] = useState(null);
  const [user, setUser] = useState(null);
  const [savedPlans, setSavedPlans] = useState([]);
  const [status, setStatus] = useState('Checking login...');
  const update = (key, value) => setForm({ ...form, [key]: value });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('healgut_current_user') || 'null');
    setUser(currentUser);
    if (!currentUser?.user_id) {
      setStatus('Please sign in to create and save diet plans.');
      return;
    }

    fetch(`${API_BASE}/api/diet-plans?user_id=${currentUser.user_id}`)
      .then((res) => res.ok ? res.json() : [])
      .then((data) => {
        setSavedPlans(data);
        setStatus('Connected to backend database');
      })
      .catch(() => setStatus('Backend is not reachable; generated plan can be viewed but not saved.'));
  }, []);

  const generatePlan = async () => {
    if (!user?.user_id) return setStatus('Please sign in before creating a diet plan.');
    if (!form.weight || !form.height || !form.age) return alert('Please fill in weight, height, and age.');
    const bmr = 10 * Number(form.weight) + 6.25 * Number(form.height) - 5 * Number(form.age) + 5;
    const multiplier = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 }[form.activity];
    let calories = bmr * multiplier;
    if (form.goal === 'gain') calories += 500;
    if (form.goal === 'lose') calories -= 500;
    const target = Math.max(1200, Math.round(calories));
    const template = plans[form.condition];
    setPlan({ bmr: Math.round(bmr), calories: target, template });

    try {
      const res = await fetch(`${API_BASE}/api/diet-plans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.user_id, daily_calories: target, goal: form.goal }),
      });
      const saved = await res.json();
      if (!res.ok) throw new Error(saved.error || 'Could not save diet plan');
      setSavedPlans([saved, ...savedPlans]);
      setStatus('Diet plan generated and saved to your user profile.');
    } catch (err) {
      setStatus(`Diet plan generated but not saved: ${err.message}`);
    }
  };

  const mealCalories = (ratio) => plan ? Math.round(plan.calories * ratio) : 0;

  return (
    <main className="page">
      <Nav />
      <section className="hero">
        <h1 style={{ fontSize: '2.6rem', margin: 0 }}>📋 IBS & GERD Diet Plan Generator</h1>
        <p>Generate a simple stomach-friendly plan for IBS, GERD, or both equally.</p>
      </section>
      <p className="disclaimer" style={{ marginTop: 16 }}>{status}</p>

      {!user ? <AuthRequired feature="the diet plan generator" /> : <>
      <section className="card" style={{ padding: 22, marginTop: 20 }}>
        <div className="grid grid-3">
          <div><label className="label">Condition</label><select className="input" value={form.condition} onChange={(e) => update('condition', e.target.value)}><option value="both">Both IBS + GERD</option><option value="ibs">IBS</option><option value="gerd">GERD</option></select></div>
          <div><label className="label">Weight (kg)</label><input className="input" type="number" value={form.weight} onChange={(e) => update('weight', e.target.value)} /></div>
          <div><label className="label">Height (cm)</label><input className="input" type="number" value={form.height} onChange={(e) => update('height', e.target.value)} /></div>
          <div><label className="label">Age</label><input className="input" type="number" value={form.age} onChange={(e) => update('age', e.target.value)} /></div>
          <div><label className="label">Activity level</label><select className="input" value={form.activity} onChange={(e) => update('activity', e.target.value)}><option value="sedentary">Sedentary</option><option value="light">Light</option><option value="moderate">Moderate</option><option value="active">Active</option></select></div>
          <div><label className="label">Goal</label><select className="input" value={form.goal} onChange={(e) => update('goal', e.target.value)}><option value="maintain">Maintain weight</option><option value="gain">Gain weight (+500 cal)</option><option value="lose">Lose weight (-500 cal)</option></select></div>
          <div><label className="label">Food preference</label><select className="input" value={form.preference} onChange={(e) => update('preference', e.target.value)}><option value="normal">Normal diet</option><option value="vegetarian">Vegetarian</option><option value="low-fat">Low-fat</option><option value="low-fodmap">Low-FODMAP preference</option></select></div>
          <div style={{ gridColumn: 'span 2' }}><label className="label">Foods to avoid manually</label><input className="input" value={form.avoid} onChange={(e) => update('avoid', e.target.value)} placeholder="e.g., coffee, onion, milk" /></div>
        </div>
        <button className="primary" style={{ marginTop: 18 }} onClick={generatePlan}>Generate plan</button>
      </section>

      {plan && (
        <section className="card" style={{ padding: 22, marginTop: 20 }}>
          <div className="grid grid-3"><div><span className="badge" style={{ background: '#dcfce7', color: '#166534' }}>BMR</span><h2>{plan.bmr} cal</h2></div><div><span className="badge" style={{ background: '#dbeafe', color: '#1d4ed8' }}>Daily target</span><h2>{plan.calories} cal</h2></div><div><span className="badge" style={{ background: '#fef9c3', color: '#854d0e' }}>{form.preference}</span><h2>{form.condition.toUpperCase()}</h2></div></div>
          <h2>Suggested meals</h2>
          {[['Breakfast', .25], ['Lunch', .35], ['Dinner', .30], ['Snack', .10]].map(([meal, ratio]) => <div key={meal} className="card" style={{ padding: 16, marginBottom: 10, boxShadow: 'none' }}><strong>{meal} • {mealCalories(ratio)} cal</strong><p>{plan.template[meal.toLowerCase()][0]}</p><small>Alternative: {plan.template[meal.toLowerCase()][1]}</small></div>)}
          <h3>Condition tips</h3><ul>{plan.template.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
          {form.avoid && <p><strong>Manual avoid list:</strong> {form.avoid}</p>}
          <p className="disclaimer">General guidance only. Please consult a qualified healthcare professional for personal medical advice.</p>
        </section>
      )}

      <section className="card" style={{ padding: 22, marginTop: 20 }}>
        <h2>Saved diet plans</h2>
        {savedPlans.length === 0 ? <p>No saved diet plans yet.</p> : savedPlans.map((item) => <div key={item.plan_id} style={{ padding: 12, borderBottom: '1px solid #e2eadf' }}><strong>{item.daily_calories} calories</strong><p>Goal: {item.goal || 'Not set'}</p><small>{new Date(item.created_at).toLocaleString()}</small></div>)}
      </section>
      </>}
    </main>
  );
}
