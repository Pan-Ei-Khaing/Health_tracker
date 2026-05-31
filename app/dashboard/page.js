'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from '../components/Nav';

const userKey = 'healgut_current_user';
const tokenKey = 'healgut_auth_token';

const modules = [
  { href: '/diet-plan', icon: '📋', title: 'Diet Plans', text: 'Create and save account-linked diet plans.' },
  { href: '/symptom-tracker', icon: '🩺', title: 'Symptoms', text: 'Log symptoms under your user account.' },
  { href: '/trigger-journal', icon: '📓', title: 'Triggers', text: 'Track food and lifestyle triggers.' },
  { href: '/calorie-calculator', icon: '🍽️', title: 'Meal Calculator', text: 'Calculate calories and meal guidance.' },
];

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem(userKey) || 'null'));
  }, []);

  const signOut = () => {
    localStorage.removeItem(userKey);
    localStorage.removeItem(tokenKey);
    setUser(null);
  };

  return (
    <main className="page">
      <Nav />

      <section className="hero">
        <span className="badge" style={{ background: '#dcfce7', color: '#166534' }}>User Dashboard</span>
        <h1 style={{ fontSize: '2.8rem', margin: '12px 0 8px' }}>Dashboard</h1>
        <p style={{ maxWidth: 760, lineHeight: 1.7 }}>
          View your profile and quickly open your diet plans, symptom logs, trigger journal, and meal tools.
        </p>
      </section>

      {!user ? (
        <section className="card" style={{ padding: 24, marginTop: 20 }}>
          <h2>Login required</h2>
          <p style={{ color: '#4f6356', lineHeight: 1.6 }}>Please sign in first to view your dashboard and save your diet plans, symptoms, and triggers under your account.</p>
          <Link className="primary" style={{ textDecoration: 'none', display: 'inline-block', marginTop: 12 }} href="/login">Go to Login</Link>
        </section>
      ) : (
        <>
          <section className="card" style={{ padding: 24, marginTop: 20 }}>
            <h2>Profile</h2>
            {user.avatar_url && <img src={user.avatar_url} alt="Profile" style={{ width: 80, height: 80, borderRadius: '50%', border: '3px solid #dcfce7' }} />}
            <p><strong>{user.name || 'Unnamed user'}</strong></p>
            <p>{user.email}</p>
            <p><span className="badge" style={{ background: '#e8f4ff', color: '#1d4ed8' }}>Signed in with {user.auth_provider || 'Google'}</span></p>
            <button className="secondary" onClick={signOut}>Sign out</button>
          </section>

          <section className="grid grid-2" style={{ marginTop: 20 }}>
            {modules.map((module) => (
              <Link key={module.href} href={module.href} style={{ textDecoration: 'none' }}>
                <article className="card" style={{ padding: 22, height: '100%' }}>
                  <div style={{ fontSize: '2.2rem' }}>{module.icon}</div>
                  <h2 style={{ color: '#14532d', marginBottom: 8 }}>{module.title}</h2>
                  <p style={{ color: '#52685a', lineHeight: 1.6 }}>{module.text}</p>
                </article>
              </Link>
            ))}
          </section>
        </>
      )}
    </main>
  );
}
