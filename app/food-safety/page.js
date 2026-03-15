'use client';
import { useState } from 'react';

const foodDatabase = [
  { name: 'Banana', level: 'safe', reason: 'Low acidity, easy to digest' },
  { name: 'Oatmeal', level: 'safe', reason: 'Whole grain, low fat' },
  { name: 'Chicken', level: 'safe', reason: 'Lean protein, low fat when grilled' },
  { name: 'Rice', level: 'safe', reason: 'Easy to digest, low acidity' },
  { name: 'Green vegetables', level: 'safe', reason: 'Low fat, high fiber' },
  { name: 'Ginger', level: 'safe', reason: 'Natural anti-inflammatory' },
  { name: 'Coffee', level: 'avoid', reason: 'High acidity, relaxes LES' },
  { name: 'Tomato', level: 'avoid', reason: 'High acidity' },
  { name: 'Chocolate', level: 'avoid', reason: 'High fat, contains caffeine' },
  { name: 'Fried chicken', level: 'avoid', reason: 'High fat, hard to digest' },
  { name: 'Citrus', level: 'avoid', reason: 'High acidity' },
  { name: 'Peppermint', level: 'avoid', reason: 'Relaxes LES muscles' },
  { name: 'Garlic', level: 'moderate', reason: 'Can trigger reflux in some' },
  { name: 'Onion', level: 'moderate', reason: 'Can trigger reflux in some' },
  { name: 'Cheese', level: 'moderate', reason: 'High fat content' },
  { name: 'Bread', level: 'moderate', reason: 'May contain yeast' },
];

export default function FoodSafety() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    const found = foodDatabase.find(f => 
      f.name.toLowerCase().includes(search.toLowerCase())
    );
    setResult(found || null);
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'safe': return '#22c55e';
      case 'moderate': return '#eab308';
      case 'avoid': return '#ef4444';
      default: return '#666';
    }
  };

  const getLevelEmoji = (level) => {
    switch(level) {
      case 'safe': return '✅';
      case 'moderate': return '⚠️';
      case 'avoid': return '❌';
      default: return '';
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🔍 Food Safety Guide</h1>
      <p>Search if a food is safe for GERD</p>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search food (e.g., Banana)"
          style={{
            flex: 1,
            padding: '0.75rem',
            fontSize: '1rem',
            border: '2px solid #ccc',
            borderRadius: '8px'
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#2c5f2d',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Search
        </button>
      </div>

      {result && (
        <div style={{
          padding: '1.5rem',
          border: `3px solid ${getLevelColor(result.level)}`,
          borderRadius: '12px',
          backgroundColor: '#f9f9f9'
        }}>
          <h2 style={{ margin: 0, color: getLevelColor(result.level) }}>
            {getLevelEmoji(result.level)} {result.name}
          </h2>
          <p><strong>Status:</strong> {result.level.toUpperCase()}</p>
          <p><strong>Reason:</strong> {result.reason}</p>
        </div>
      )}

      {!result && search && (
        <p>No data found for "{search}"</p>
      )}

      <div style={{ marginTop: '2rem' }}>
        <h3>Legend</h3>
        <p>✅ Safe - Good for GERD</p>
        <p>⚠️ Moderate - Eat in small amounts</p>
        <p>❌ Avoid - Trigger foods</p>
      </div>
    </div>
  );
}
