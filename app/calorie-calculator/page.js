'use client';
import { useState } from 'react';

const foodItems = [
  { name: 'Oatmeal', calories: 150, portion: '1 cup' },
  { name: 'Banana', calories: 105, portion: '1 medium' },
  { name: 'Chicken Breast', calories: 165, portion: '100g' },
  { name: 'Rice', calories: 206, portion: '1 cup cooked' },
  { name: 'Green Vegetables', calories: 50, portion: '1 cup' },
  { name: 'Fish (Salmon)', calories: 208, portion: '100g' },
  { name: 'Sweet Potato', calories: 103, portion: '1 medium' },
  { name: 'Egg', calories: 78, portion: '1 large' },
  { name: 'Bread', calories: 79, portion: '1 slice' },
  { name: 'Milk', calories: 103, portion: '1 cup' },
  { name: 'Apple', calories: 95, portion: '1 medium' },
  { name: 'Yogurt', calories: 100, portion: '1 cup' },
];

export default function CalorieCalculator() {
  const [selectedFoods, setSelectedFoods] = useState([]);

  const addFood = (food) => {
    setSelectedFoods([...selectedFoods, { ...food, id: Date.now() }]);
  };

  const removeFood = (id) => {
    setSelectedFoods(selectedFoods.filter(f => f.id !== id));
  };

  const totalCalories = selectedFoods.reduce((sum, food) => sum + food.calories, 0);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🍎 Meal Calorie Calculator</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h3>Available Foods</h3>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {foodItems.map((food, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '0.75rem',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px'
              }}>
                <span>
                  <strong>{food.name}</strong> ({food.portion})
                  <br />
                  <small>{food.calories} cal</small>
                </span>
                <button
                  onClick={() => addFood(food)}
                  style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: '#2c5f2d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3>Your Meal</h3>
          {selectedFoods.length === 0 ? (
            <p>No foods added yet. Click "Add" to build your meal.</p>
          ) : (
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {selectedFoods.map((food) => (
                <div key={food.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '0.75rem',
                  backgroundColor: '#e8f5e9',
                  borderRadius: '8px'
                }}>
                  <span>
                    <strong>{food.name}</strong>
                    <br />
                    <small>{food.calories} cal</small>
                  </span>
                  <button
                    onClick={() => removeFood(food.id)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1rem', 
            backgroundColor: '#2c5f2d', 
            color: 'white',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h2 style={{ margin: 0 }}>Total: {totalCalories} calories</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
