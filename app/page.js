'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif',
      maxWidth: '900px',
      margin: '0 auto',
      backgroundColor: '#f0fdf4'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#2c5f2d', marginBottom: '0.5rem' }}>🍏 GERD Diet Guide</h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
          Help GERD patients identify safe foods & maintain a healthy diet
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gap: '1.5rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
      }}>
        <Link href="/food-safety" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '2rem',
            border: '3px solid #22c55e',
            borderRadius: '16px',
            cursor: 'pointer',
            textAlign: 'center',
            backgroundColor: '#fff',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h2 style={{ color: '#22c55e', margin: '0 0 0.5rem 0' }}>Food Safety Guide</h2>
            <p style={{ color: '#666', margin: 0 }}>
              Check if a food is safe for GERD. Search 75+ foods with safety levels
            </p>
          </div>
        </Link>

        <Link href="/diet-plan" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '2rem',
            border: '3px solid #3b82f6',
            borderRadius: '16px',
            cursor: 'pointer',
            textAlign: 'center',
            backgroundColor: '#fff',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <h2 style={{ color: '#3b82f6', margin: '0 0 0.5rem 0' }}>Diet Plan Generator</h2>
            <p style={{ color: '#666', margin: 0 }}>
              Generate personalized meal plans based on your weight, height & goals
            </p>
          </div>
        </Link>

        <Link href="/calorie-calculator" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '2rem',
            border: '3px solid #f59e0b',
            borderRadius: '16px',
            cursor: 'pointer',
            textAlign: 'center',
            backgroundColor: '#fff',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍎</div>
            <h2 style={{ color: '#f59e0b', margin: '0 0 0.5rem 0' }}>Meal Calculator</h2>
            <p style={{ color: '#666', margin: 0 }}>
              Calculate calories for your meals. Build balanced GERD-safe meals
            </p>
          </div>
        </Link>
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center', padding: '1.5rem', backgroundColor: '#fff', borderRadius: '12px' }}>
        <h3 style={{ color: '#2c5f2d', marginTop: 0 }}>What is GERD?</h3>
        <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>
          GERD (Gastroesophageal Reflux Disease) is a chronic digestive disease where stomach acid flows back into the esophagus, causing irritation. 
          Diet plays a crucial role in managing GERD symptoms.
        </p>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center', color: '#999', fontSize: '0.9rem' }}>
        <p>Built for GERD patients who want to eat healthy • 75+ foods catalogued</p>
      </div>
    </div>
  );
}
