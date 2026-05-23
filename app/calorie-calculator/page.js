'use client';
import { useMemo, useState } from 'react';
import Nav from '../components/Nav';
import { foods, riskyFor, levelInfo } from '../data/foods';

export default function CalorieCalculator() {
  const [mealType, setMealType] = useState('Lunch');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState([]);
  const visibleFoods = useMemo(() => foods.filter((food) => food.name.toLowerCase().includes(query.toLowerCase())).slice(0, 24), [query]);
  const total = selected.reduce((sum, item) => sum + item.calories, 0);
  const warnings = selected.flatMap((item) => riskyFor(item).map((risk) => `${item.name} — ${risk}`));
  const addFood = (food) => setSelected([...selected, { ...food, rowId: `${food.name}-${Date.now()}-${Math.random()}` }]);
  const removeFood = (rowId) => setSelected(selected.filter((item) => item.rowId !== rowId));

  return (
    <main className="page">
      <Nav />
      <section className="hero"><h1 style={{ fontSize: '2.6rem', margin: 0 }}>🍽️ Meal Calorie Calculator</h1><p>Build a meal, calculate calories, classify meal type, and see IBS/GERD risk warnings.</p></section>
      <section className="grid grid-2" style={{ marginTop: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <div className="grid grid-2"><div><label className="label">Meal type</label><select className="input" value={mealType} onChange={(e) => setMealType(e.target.value)}><option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Snack</option></select></div><div><label className="label">Search foods</label><input className="input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search 100+ foods" /></div></div>
          <h2>Available foods</h2>
          <div className="grid">{visibleFoods.map((food) => <div key={food.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: 12, border: '1px solid #e2eadf', borderRadius: 14 }}><div><strong>{food.name}</strong><br/><small>{food.category} • {food.calories} cal • {food.portion}</small></div><button className="secondary" onClick={() => addFood(food)}>Add</button></div>)}</div>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <span className="badge" style={{ background: '#dbeafe', color: '#1d4ed8' }}>{mealType}</span>
          <h2>Your meal: {total} calories</h2>
          {selected.length === 0 ? <p>No foods added yet.</p> : selected.map((item) => <div key={item.rowId} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: 12, border: '1px solid #e2eadf', borderRadius: 14, marginBottom: 8 }}><div><strong>{item.name}</strong><br/><small>{item.calories} cal • IBS {levelInfo[item.ibs].emoji} • GERD {levelInfo[item.gerd].emoji}</small></div><button className="secondary" onClick={() => removeFood(item.rowId)}>Remove</button></div>)}
          <div style={{ padding: 16, borderRadius: 16, background: '#ecfdf5', marginTop: 14 }}><strong>Total calories:</strong> {total}</div>
          {warnings.length > 0 && <div className="disclaimer" style={{ marginTop: 14 }}><strong>Condition warnings</strong><ul>{warnings.map((warning, index) => <li key={index}>{warning}</li>)}</ul></div>}
        </div>
      </section>
    </main>
  );
}
