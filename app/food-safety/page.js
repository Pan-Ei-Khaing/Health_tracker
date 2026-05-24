'use client';
import { useMemo, useState } from 'react';
import Nav from '../components/Nav';
import { foods, categories, getLevel, levelInfo } from '../data/foods';

export default function FoodSafety() {
  const [search, setSearch] = useState('');
  const [condition, setCondition] = useState('both');
  const [category, setCategory] = useState('All');

  const results = useMemo(() => foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || food.category === category;
    return matchesSearch && matchesCategory;
  }), [search, category]);

  const counts = ['safe', 'moderate', 'avoid'].map((level) => ({ level, count: results.filter((food) => getLevel(food, condition) === level).length }));

  return (
    <main className="page">
      <Nav />
      <section className="hero">
        <h1 style={{ fontSize: '2.6rem', margin: 0 }}>🔍 Food Safety Guide</h1>
        <p style={{ color: '#4b6354', fontSize: '1.1rem' }}>Search foods and compare IBS and GERD safety levels. Includes Myanmar/local foods plus edible seeds and nuts such as sunflower seeds.</p>
        <div className="grid grid-3" style={{ marginTop: 18 }}>
          <div><label className="label">Search food</label><input className="input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="e.g., sunflower seeds, Mohinga, coffee" /></div>
          <div><label className="label">Condition filter</label><select className="input" value={condition} onChange={(e) => setCondition(e.target.value)}><option value="both">Both IBS + GERD</option><option value="ibs">IBS only</option><option value="gerd">GERD only</option></select></div>
          <div><label className="label">Category</label><select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((cat) => <option key={cat}>{cat}</option>)}</select></div>
        </div>
      </section>

      <section className="grid grid-3" style={{ margin: '20px 0' }}>
        {counts.map(({ level, count }) => <div key={level} className="card" style={{ padding: 18, borderColor: levelInfo[level].color }}><span className="badge" style={{ background: levelInfo[level].soft, color: levelInfo[level].color }}>{levelInfo[level].emoji} {levelInfo[level].label}</span><h2 style={{ margin: '10px 0 0' }}>{count} foods</h2></div>)}
      </section>

      <section className="grid grid-2">
        {results.map((food) => {
          const overall = levelInfo[getLevel(food, condition)];
          const ibs = levelInfo[food.ibs];
          const gerd = levelInfo[food.gerd];
          return (
            <article key={food.name} className="card" style={{ padding: 20, borderLeft: `8px solid ${overall.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <div><h2 style={{ margin: 0, color: '#143b24' }}>{food.name}</h2><p style={{ margin: '6px 0', color: '#5a6e60' }}>{food.category} • {food.calories} cal • {food.portion}</p></div>
                <span className="badge" style={{ background: overall.soft, color: overall.color }}>{overall.emoji} {overall.label}</span>
              </div>
              <div className="grid grid-2" style={{ marginTop: 14 }}>
                <div style={{ background: ibs.soft, borderRadius: 14, padding: 12 }}><strong style={{ color: ibs.color }}>IBS: {ibs.emoji} {ibs.label}</strong><p>{food.ibsReason}</p></div>
                <div style={{ background: gerd.soft, borderRadius: 14, padding: 12 }}><strong style={{ color: gerd.color }}>GERD: {gerd.emoji} {gerd.label}</strong><p>{food.gerdReason}</p></div>
              </div>
              <p style={{ marginBottom: 0 }}><strong>Safer alternative:</strong> {food.alternative}</p>
            </article>
          );
        })}
      </section>

      {results.length === 0 && <p className="card" style={{ padding: 20 }}>No foods found. Try another search or category.</p>}
    </main>
  );
}
