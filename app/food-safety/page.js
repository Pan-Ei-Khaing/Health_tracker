'use client';
import { useState } from 'react';

const foods = [
  // SAFE FOODS
  { id: 1, name: 'Banana', category: 'Fruit', level: 'safe', calories: 89, portion: '1 medium', reason: 'Low acidity, easy to digest' },
  { id: 2, name: 'Oatmeal', category: 'Grains', level: 'safe', calories: 68, portion: '1 cup cooked', reason: 'Whole grain, low fat' },
  { id: 3, name: 'Chicken Breast', category: 'Protein', level: 'safe', calories: 165, portion: '100g', reason: 'Lean protein, low fat when grilled' },
  { id: 4, name: 'Brown Rice', category: 'Grains', level: 'safe', calories: 111, portion: '1 cup cooked', reason: 'Easy to digest, low acidity' },
  { id: 5, name: 'White Rice', category: 'Grains', level: 'safe', calories: 130, portion: '1 cup cooked', reason: 'Easy to digest, low acidity' },
  { id: 6, name: 'Green Vegetables', category: 'Vegetables', level: 'safe', calories: 50, portion: '1 cup', reason: 'Low fat, high fiber' },
  { id: 7, name: 'Ginger', category: 'Spices', level: 'safe', calories: 80, portion: '1 tsp', reason: 'Natural anti-inflammatory' },
  { id: 8, name: 'Salmon', category: 'Protein', level: 'safe', calories: 208, portion: '100g', reason: 'Omega-3, low fat when baked' },
  { id: 9, name: 'Sweet Potato', category: 'Vegetables', level: 'safe', calories: 86, portion: '1 medium', reason: 'Easy to digest, low acidity' },
  { id: 10, name: 'Egg White', category: 'Protein', level: 'safe', calories: 52, portion: '2 large', reason: 'Low fat protein' },
  { id: 11, name: 'Turkey Breast', category: 'Protein', level: 'safe', calories: 135, portion: '100g', reason: 'Low fat protein' },
  { id: 12, name: 'Cod', category: 'Protein', level: 'safe', calories: 82, portion: '100g', reason: 'Very lean, easy to digest' },
  { id: 13, name: 'Tilapia', category: 'Protein', level: 'safe', calories: 96, portion: '100g', reason: 'Lean fish, low fat' },
  { id: 14, name: 'Quinoa', category: 'Grains', level: 'safe', calories: 120, portion: '1 cup cooked', reason: 'Complete protein, easy to digest' },
  { id: 15, name: 'Pasta', category: 'Grains', level: 'safe', calories: 131, portion: '1 cup cooked', reason: 'Low fat when plain' },
  { id: 16, name: 'Bread (White)', category: 'Grains', level: 'safe', calories: 79, portion: '1 slice', reason: 'Low fat option' },
  { id: 17, name: 'Milk (Skim)', category: 'Dairy', level: 'safe', calories: 34, portion: '1 cup', reason: 'Low fat dairy' },
  { id: 18, name: 'Yogurt (Plain)', category: 'Dairy', level: 'safe', calories: 59, portion: '1 cup', reason: 'Probiotics help digestion' },
  { id: 19, name: 'Apple', category: 'Fruit', level: 'safe', calories: 52, portion: '1 medium', reason: 'Low acidity when peeled' },
  { id: 20, name: 'Papaya', category: 'Fruit', level: 'safe', calories: 43, portion: '1 cup', reason: 'Contains digestive enzymes' },
  { id: 21, name: 'Watermelon', category: 'Fruit', level: 'safe', calories: 30, portion: '1 cup', reason: 'High water content, low acidity' },
  { id: 22, name: 'Cantaloupe', category: 'Fruit', level: 'safe', calories: 34, portion: '1 cup', reason: 'Low acidity melon' },
  { id: 23, name: 'Honeydew', category: 'Fruit', level: 'safe', calories: 36, portion: '1 cup', reason: 'Low acidity melon' },
  { id: 24, name: 'Cucumber', category: 'Vegetables', level: 'safe', calories: 15, portion: '1 cup', reason: 'High water, low acidity' },
  { id: 25, name: 'Zucchini', category: 'Vegetables', level: 'safe', calories: 17, portion: '1 cup', reason: 'Easy to digest' },
  { id: 26, name: 'Carrot', category: 'Vegetables', level: 'safe', calories: 41, portion: '1 medium', reason: 'Low acidity, high fiber' },
  { id: 27, name: 'Green Beans', category: 'Vegetables', level: 'safe', calories: 31, portion: '1 cup', reason: 'Low fat, high fiber' },
  { id: 28, name: 'Asparagus', category: 'Vegetables', level: 'safe', calories: 20, portion: '6 spears', reason: 'Gentle on stomach' },
  { id: 29, name: 'Potato', category: 'Vegetables', level: 'safe', calories: 77, portion: '1 medium', reason: 'Easy to digest' },
  { id: 30, name: 'Pumpkin', category: 'Vegetables', level: 'safe', calories: 26, portion: '1 cup', reason: 'Easy to digest' },
  
  // MODERATE FOODS
  { id: 31, name: 'Garlic', category: 'Spices', level: 'moderate', calories: 149, portion: '1 clove', reason: 'Can trigger reflux in some people' },
  { id: 32, name: 'Onion', category: 'Vegetables', level: 'moderate', calories: 40, portion: '1/2 cup', reason: 'Can trigger reflux in some people' },
  { id: 33, name: 'Cheese (Cheddar)', category: 'Dairy', level: 'moderate', calories: 113, portion: '30g', reason: 'Moderate fat content' },
  { id: 34, name: 'Cheese (Mozzarella)', category: 'Dairy', level: 'moderate', calories: 85, portion: '30g', reason: 'Lower fat option' },
  { id: 35, name: 'Butter', category: 'Dairy', level: 'moderate', calories: 102, portion: '1 tbsp', reason: 'Use in moderation' },
  { id: 36, name: 'Peanut Butter', category: 'Protein', level: 'moderate', calories: 588, portion: '2 tbsp', reason: 'Can trigger reflux in some' },
  { id: 37, name: 'Almonds', category: 'Nuts', level: 'moderate', calories: 579, portion: '30g', reason: 'Healthy fats, small portions' },
  { id: 38, name: 'Walnuts', category: 'Nuts', level: 'moderate', calories: 654, portion: '30g', reason: 'Healthy fats, small portions' },
  { id: 39, name: 'Tofu', category: 'Protein', level: 'moderate', calories: 76, portion: '100g', reason: 'Good protein source' },
  { id: 40, name: 'Tempeh', category: 'Protein', level: 'moderate', calories: 192, portion: '100g', reason: 'Fermented soy, probiotic benefits' },
  { id: 41, name: 'Coconut Milk', category: 'Dairy Alternative', level: 'moderate', calories: 230, portion: '1 cup', reason: 'Use in moderation' },
  { id: 42, name: 'Olive Oil', category: 'Fats', level: 'moderate', calories: 884, portion: '1 tbsp', reason: 'Use in small amounts' },
  { id: 43, name: 'Avocado', category: 'Fruit', level: 'moderate', calories: 160, portion: '1/2 fruit', reason: 'Healthy fats, small portions' },
  { id: 44, name: 'Tomato (Cooked)', category: 'Vegetables', level: 'moderate', calories: 32, portion: '1/2 cup', reason: 'Less acidic than raw' },
  
  // AVOID FOODS
  { id: 45, name: 'Coffee', category: 'Beverages', level: 'avoid', calories: 2, portion: '1 cup', reason: 'High acidity, relaxes LES' },
  { id: 46, name: 'Tea (Black)', category: 'Beverages', level: 'avoid', calories: 1, portion: '1 cup', reason: 'High tannins' },
  { id: 47, name: 'Tea (Peppermint)', category: 'Beverages', level: 'avoid', calories: 1, portion: '1 cup', reason: 'Relaxes LES muscles' },
  { id: 48, name: 'Soda', category: 'Beverages', level: 'avoid', calories: 39, portion: '1 can', reason: 'Carbonation increases pressure' },
  { id: 49, name: 'Chocolate', category: 'Desserts', level: 'avoid', calories: 546, portion: '30g', reason: 'High fat, contains caffeine' },
  { id: 50, name: 'Fried Chicken', category: 'Protein', level: 'avoid', calories: 307, portion: '100g', reason: 'High fat, hard to digest' },
  { id: 51, name: 'Pizza', category: 'Fast Food', level: 'avoid', calories: 266, portion: '1 slice', reason: 'High fat, cheese, acidic tomato' },
  { id: 52, name: 'Burger', category: 'Fast Food', level: 'avoid', calories: 295, portion: '1 burger', reason: 'High fat, triggers reflux' },
  { id: 53, name: 'French Fries', category: 'Fast Food', level: 'avoid', calories: 312, portion: 'medium', reason: 'High fat, salty' },
  { id: 54, name: 'Ice Cream', category: 'Desserts', level: 'avoid', calories: 207, portion: '1/2 cup', reason: 'High fat, cold triggers' },
  { id: 55, name: 'Chips', category: 'Snacks', level: 'avoid', calories: 536, portion: '30g', reason: 'High fat, salty' },
  { id: 56, name: 'Citrus Fruit', category: 'Fruit', level: 'avoid', calories: 35, portion: '1 medium', reason: 'High acidity' },
  { id: 57, name: 'Lemon', category: 'Fruit', level: 'avoid', calories: 29, portion: '1 fruit', reason: 'Very high acidity' },
  { id: 58, name: 'Orange', category: 'Fruit', level: 'avoid', calories: 47, portion: '1 medium', reason: 'High acidity' },
  { id: 59, name: 'Grapefruit', category: 'Fruit', level: 'avoid', calories: 42, portion: '1/2 medium', reason: 'Very high acidity' },
  { id: 60, name: 'Tomato (Raw)', category: 'Vegetables', level: 'avoid', calories: 18, portion: '1 medium', reason: 'High acidity' },
  { id: 61, name: 'Ketchup', category: 'Condiments', level: 'avoid', calories: 101, portion: '2 tbsp', reason: 'High acidity' },
  { id: 62, name: 'Vinegar', category: 'Condiments', level: 'avoid', calories: 18, portion: '1 tbsp', reason: 'High acidity' },
  { id: 63, name: 'Spicy Food', category: 'Various', level: 'avoid', calories: 0, portion: 'varies', reason: 'Can irritate stomach' },
  { id: 64, name: 'Alcohol', category: 'Beverages', level: 'avoid', calories: 0, portion: '1 drink', reason: 'Relaxes LES, irritates stomach' },
  { id: 65, name: 'Wine', category: 'Beverages', level: 'avoid', calories: 83, portion: '1 glass', reason: 'High acidity, alcohol' },
  { id: 66, name: 'Beer', category: 'Beverages', level: 'avoid', calories: 43, portion: '1 bottle', reason: 'Carbonation + alcohol' },
  { id: 67, name: 'Mint', category: 'Herbs', level: 'avoid', calories: 0, portion: '1 tsp', reason: 'Relaxes LES muscles' },
  { id: 68, name: 'Bacon', category: 'Protein', level: 'avoid', calories: 541, portion: '3 slices', reason: 'High fat, nitrates' },
  { id: 69, name: 'Sausage', category: 'Protein', level: 'avoid', calories: 301, portion: '2 links', reason: 'High fat, processed' },
  { id: 70, name: 'Ham', category: 'Protein', level: 'avoid', calories: 145, portion: '100g', reason: 'High sodium, fat' },
  { id: 71, name: 'Gravy', category: 'Sauces', level: 'avoid', calories: 82, portion: '1/4 cup', reason: 'High fat' },
  { id: 72, name: 'Mayonnaise', category: 'Condiments', level: 'avoid', calories: 680, portion: '1 tbsp', reason: 'High fat' },
  { id: 73, name: 'Sour Cream', category: 'Dairy', level: 'avoid', calories: 193, portion: '2 tbsp', reason: 'High fat' },
  { id: 74, name: 'Whole Milk', category: 'Dairy', level: 'avoid', calories: 61, portion: '1 cup', reason: 'High fat' },
  { id: 75, name: 'Cheddar Cheese', category: 'Dairy', level: 'avoid', calories: 403, portion: '30g', reason: 'High fat, aged' },
];

export default function FoodSafety() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const handleSearch = () => {
    if (!search.trim()) {
      setResults([]);
      return;
    }
    const filtered = foods.filter(f => 
      f.name.toLowerCase().includes(search.toLowerCase())
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

  const safeFoods = foods.filter(f => f.level === 'safe');
  const moderateFoods = foods.filter(f => f.level === 'moderate');
  const avoidFoods = foods.filter(f => f.level === 'avoid');

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c5f2d' }}>🔍 Food Safety Guide</h1>
      <p>Search if a food is safe for GERD</p>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
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

      {search && results.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3>Search Results:</h3>
          {results.map(food => (
            <div key={food.id} style={{
              padding: '1rem',
              marginBottom: '0.5rem',
              border: `3px solid ${getLevelColor(food.level)}`,
              borderRadius: '12px',
              backgroundColor: '#f9f9f9'
            }}>
              <h2 style={{ margin: 0, color: getLevelColor(food.level) }}>
                {getLevelEmoji(food.level)} {food.name}
              </h2>
              <p style={{ margin: '0.5rem 0' }}><strong>Category:</strong> {food.category}</p>
              <p style={{ margin: '0.5rem 0' }}><strong>Status:</strong> {getLevelText(food.level)}</p>
              <p style={{ margin: '0.5rem 0' }}><strong>Calories:</strong> {food.calories} cal per 100g</p>
              <p style={{ margin: '0.5rem 0' }}><strong>Portion:</strong> {food.portion}</p>
              <p style={{ margin: '0.5rem 0' }}><strong>Why:</strong> {food.reason}</p>
            </div>
          ))}
        </div>
      )}

      {search && results.length === 0 && (
        <p>No foods found for "{search}"</p>
      )}

      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => setShowAll(!showAll)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#2c5f2d',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '1rem'
          }}
        >
          {showAll ? 'Hide All Foods' : 'Show All Foods'}
        </button>
      </div>

      {showAll && (
        <>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#22c55e' }}>✅ Safe Foods ({safeFoods.length})</h3>
            <div style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
              {safeFoods.map(food => (
                <div key={food.id} style={{
                  padding: '0.75rem',
                  border: '2px solid #22c55e',
                  borderRadius: '8px',
                  backgroundColor: '#f0fdf4',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setSearch(food.name);
                  handleSearch();
                }}
                >
                  <span>✅</span>
                  <span style={{ marginLeft: '0.5rem' }}>{food.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#eab308' }}>⚠️ Moderate Foods ({moderateFoods.length})</h3>
            <div style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
              {moderateFoods.map(food => (
                <div key={food.id} style={{
                  padding: '0.75rem',
                  border: '2px solid #eab308',
                  borderRadius: '8px',
                  backgroundColor: '#fefce8',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setSearch(food.name);
                  handleSearch();
                }}
                >
                  <span>⚠️</span>
                  <span style={{ marginLeft: '0.5rem' }}>{food.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#ef4444' }}>❌ Avoid Foods ({avoidFoods.length})</h3>
            <div style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
              {avoidFoods.map(food => (
                <div key={food.id} style={{
                  padding: '0.75rem',
                  border: '2px solid #ef4444',
                  borderRadius: '8px',
                  backgroundColor: '#fef2f2',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setSearch(food.name);
                  handleSearch();
                }}
                >
                  <span>❌</span>
                  <span style={{ marginLeft: '0.5rem' }}>{food.name}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '12px' }}>
        <h3>Legend</h3>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
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
    </div>
  );
}
