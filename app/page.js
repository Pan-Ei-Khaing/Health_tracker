import Link from 'next/link';
import Nav from './components/Nav';
import { foods } from './data/foods';

const features = [
  { href: '/food-safety', icon: '🔍', title: 'IBS & GERD Food Safety', text: 'Search foods, compare IBS and GERD safety levels, and view safer alternatives.' },
  { href: '/diet-plan', icon: '📋', title: 'Diet Plan Generator', text: 'Create a simple meal plan for IBS, GERD, or both with calorie targets.' },
  { href: '/calorie-calculator', icon: '🍽️', title: 'Meal Calculator', text: 'Build meals, calculate calories, and see warnings for risky foods.' },
  { href: '/symptom-tracker', icon: '🩺', title: 'Local Symptom Tracker', text: 'Save symptom logs locally first, including severity, stress, sleep, and related meals.' },
  { href: '/trigger-journal', icon: '📓', title: 'Trigger Journal', text: 'Track suspected food and lifestyle triggers and find repeated patterns.' },
  { href: '/education', icon: '📚', title: 'Patient Education', text: 'Learn about IBS, GERD, low-FODMAP basics, lifestyle tips, and warning signs.' },
];

export default function Home() {
  return (
    <main className="page">
      <Nav />
      <section className="hero">
        <div style={{ maxWidth: 850 }}>
          <span className="badge" style={{ background: '#dcfce7', color: '#166534' }}>HealGut • IBS & GERD equally</span>
          <h1 style={{ fontSize: '3.3rem', lineHeight: 1.05, margin: '18px 0 12px' }}>Stomach care platform for IBS and GERD patients</h1>
          <p style={{ fontSize: '1.2rem', color: '#496153', lineHeight: 1.7 }}>
            Help patients search safe foods, plan stomach-friendly meals, calculate calories, log symptoms locally, and discover personal triggers. English first, with Burmese/Myanmar support planned next.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 22 }}>
            <Link className="primary" style={{ textDecoration: 'none' }} href="/food-safety">Start food search</Link>
            <Link className="secondary" style={{ textDecoration: 'none' }} href="/symptom-tracker">Log symptoms</Link>
          </div>
        </div>
      </section>

      <section className="grid grid-3" style={{ marginTop: 24 }}>
        {features.map((feature) => (
          <Link key={feature.href} href={feature.href} style={{ textDecoration: 'none' }}>
            <article className="card" style={{ padding: 22, height: '100%' }}>
              <div style={{ fontSize: '2.4rem' }}>{feature.icon}</div>
              <h2 style={{ color: '#14532d', marginBottom: 8 }}>{feature.title}</h2>
              <p style={{ color: '#52685a', lineHeight: 1.6 }}>{feature.text}</p>
            </article>
          </Link>
        ))}
      </section>

      <section className="grid grid-3" style={{ marginTop: 24 }}>
        <div className="card" style={{ padding: 22 }}><strong>{foods.length}+ foods</strong><p>Includes global and Myanmar/local foods with IBS and GERD levels.</p></div>
        <div className="card" style={{ padding: 22 }}><strong>Local-first logs</strong><p>Symptoms and triggers are stored in the browser before account features are added.</p></div>
        <div className="card" style={{ padding: 22 }}><strong>Medical safety</strong><p>General education only. The app does not diagnose or replace healthcare professionals.</p></div>
      </section>

      <p className="disclaimer" style={{ marginTop: 24 }}>
        This app provides general educational information only. It is not a medical diagnosis or treatment plan. Please consult a qualified healthcare professional for personal medical advice.
      </p>
    </main>
  );
}
