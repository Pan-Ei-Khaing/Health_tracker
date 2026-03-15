import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{ textAlign: 'center', color: '#2c5f2d' }}>GERD Diet Guide</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
        Help GERD patients identify safe foods and maintain a healthy diet
      </p>

      <div style={{ 
        display: 'grid', 
        gap: '1.5rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
      }}>
        <Link href="/food-safety" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '2rem',
            border: '2px solid #2c5f2d',
            borderRadius: '12px',
            cursor: 'pointer',
            textAlign: 'center',
            backgroundColor: '#f0f8f0'
          }}>
            <h2 style={{ color: '#2c5f2d', margin: 0 }}>🔍 Food Safety Guide</h2>
            <p style={{ color: '#666' }}>Check if a food is safe for GERD</p>
          </div>
        </Link>

        <Link href="/diet-plan" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '2rem',
            border: '2px solid #2c5f2d',
            borderRadius: '12px',
            cursor: 'pointer',
            textAlign: 'center',
            backgroundColor: '#f0f8f0'
          }}>
            <h2 style={{ color: '#2c5f2d', margin: 0 }}>📋 Diet Plan Generator</h2>
            <p style={{ color: '#666' }}>Generate personalized meal plans</p>
          </div>
        </Link>

        <Link href="/calorie-calculator" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '2rem',
            border: '2px solid #2c5f2d',
            borderRadius: '12px',
            cursor: 'pointer',
            textAlign: 'center',
            backgroundColor: '#f0f8f0'
          }}>
            <h2 style={{ color: '#2c5f2d', margin: 0 }}>🍎 Meal Calculator</h2>
            <p style={{ color: '#666' }}>Calculate calories for your meals</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
