'use client';
import { useState, useEffect } from 'react';

export default function FoodSafety() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all foods on load
  useEffect(() => {
    fetch('http://localhost:3001/api/foods')
      .then(res => res.json())
      .then(data => {
        setFoods(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    if (!search.trim()) {
      setResults([]);
      return;
    }
    const filtered = foods.filter(f => 
      f.food_name.toLowerCase().includes(search.toLowerCase())
    );
    setResults(filtered);
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

  const getLevelText = (level) => {
    switch(level) {
      case 'safe': return 'Safe for GERD';
      case 'moderate': return 'Moderate - eat small amounts';
      case 'avoid': return 'Avoid - triggers reflux';
      default: return '';
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🔍 Food Safety Guide</h1>
      <p>Search if a food is safe for GERD</p>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search food (e.g., Banana, Coffee, Rice)"
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

      {loading ? (
        <p>Loading food database...</p>
      ) : (
        <>
          {results.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h3>Search Results:</h3>
              {results.map(food => (
                <div key={food.food_id} style={{
                  padding: '1rem',
                  marginBottom: '0.5rem',
                  border: `3px solid ${getLevelColor(food.gerd_level)}`,
                  borderRadius: '12px',
                  backgroundColor: '#f9f9f9'
                }}>
                  <h2 style={{ margin: 0, color: getLevelColor(food.gerd_level) }}>
                    {getLevelEmoji(food.gerd_level)} {food.food_name}
                  </h2>
                  <p style={{ margin: '0.5rem 0' }}>
                    <strong>Category:</strong> {food.category}
                  </p>
                  <p style={{ margin: '0.5rem 0' }}>
                    <strong>Status:</strong> {getLevelText(food.gerd_level)}
                  </p>
                  <p style={{ margin: '0.5rem 0' }}>
                    <strong>Calories:</strong> {food.calories_per_100g} cal per 100g
                  </p>
                  <p style={{ margin: '0.5rem 0' }}>
                    <strong>Why:</strong> {food.reason}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div>
            <h3>All Foods ({foods.length} items)</h3>
            <div style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>
              {foods.map(food => (
                <div key={food.food_id} style={{
                  padding: '0.75rem',
                  border: `2px solid ${getLevelColor(food.gerd_level)}`,
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setSearch(food.food_name);
                  handleSearch();
                }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{getLevelEmoji(food.gerd_level)}</span>
                  <span style={{ marginLeft: '0.5rem' }}>{food.food_name}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h3>Legend</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>✅</span>
                <span><strong>Safe</strong> - Good for GERD</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                <span><strong>Moderate</strong> - Small amounts only</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>❌</span>
                <span><strong>Avoid</strong> - Trigger foods</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
