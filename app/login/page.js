'use client';

import { useEffect, useState } from 'react';
import Nav from '../components/Nav';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
const userKey = 'healgut_current_user';

export default function LoginPage() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('');
  const [localForm, setLocalForm] = useState({ name: '', email: '' });

  const saveUser = (nextUser) => {
    localStorage.setItem(userKey, JSON.stringify(nextUser));
    setUser(nextUser);
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem(userKey) || 'null'));
  }, []);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !window.google) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: async (response) => {
        setStatus('Signing in with Google...');
        try {
          const res = await fetch(`${API_BASE}/api/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential: response.credential }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Google login failed');
          saveUser(data.user);
          setStatus('Google login successful.');
        } catch (err) {
          setStatus(err.message);
        }
      },
    });

    window.google.accounts.id.renderButton(document.getElementById('googleSignIn'), {
      theme: 'outline',
      size: 'large',
      width: 280,
    });
  }, []);

  const createLocalProfile = async () => {
    if (!localForm.email.trim()) return alert('Please enter an email.');
    setStatus('Creating local profile...');
    try {
      const res = await fetch(`${API_BASE}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not create profile');
      saveUser(data);
      setStatus('Local profile created.');
    } catch (err) {
      setStatus(err.message);
    }
  };

  const signOut = () => {
    localStorage.removeItem(userKey);
    setUser(null);
    setStatus('Signed out.');
  };

  return (
    <main className="page">
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      <Nav />
      <section className="hero">
        <h1 style={{ fontSize: '2.6rem', margin: 0 }}>👤 Login / Register</h1>
        <p>Register with Google login so symptoms, triggers, meals, and diet plans can be saved under one user.</p>
      </section>

      <section className="grid grid-2" style={{ marginTop: 20 }}>
        <div className="card" style={{ padding: 22 }}>
          <h2>Google login</h2>
          {!GOOGLE_CLIENT_ID && <p className="disclaimer">Google OAuth Client ID is not configured yet. Add NEXT_PUBLIC_GOOGLE_CLIENT_ID in frontend and GOOGLE_CLIENT_ID in backend.</p>}
          <div id="googleSignIn" style={{ marginTop: 16 }}></div>
          <p style={{ color: '#4f6356', lineHeight: 1.6 }}>After login, the backend creates or updates the user record using your Google email.</p>
        </div>

        <div className="card" style={{ padding: 22 }}>
          <h2>Current profile</h2>
          {user ? (
            <div>
              {user.avatar_url && <img src={user.avatar_url} alt="Profile" style={{ width: 64, height: 64, borderRadius: '50%' }} />}
              <p><strong>{user.name || 'Unnamed user'}</strong></p>
              <p>{user.email}</p>
              <p className="badge">Provider: {user.auth_provider || 'local'}</p><br />
              <button className="secondary" style={{ marginTop: 12 }} onClick={signOut}>Sign out</button>
            </div>
          ) : (
            <p>No user logged in yet.</p>
          )}
          {status && <p className="disclaimer" style={{ marginTop: 12 }}>{status}</p>}
        </div>
      </section>

      <section className="card" style={{ padding: 22, marginTop: 20 }}>
        <h2>Local test profile</h2>
        <p style={{ color: '#4f6356' }}>Use this while Google OAuth Client ID is not ready. It still creates a row in the users table.</p>
        <div className="grid grid-2">
          <div><label className="label">Name</label><input className="input" value={localForm.name} onChange={(e) => setLocalForm({ ...localForm, name: e.target.value })} placeholder="Pan Ei" /></div>
          <div><label className="label">Email</label><input className="input" value={localForm.email} onChange={(e) => setLocalForm({ ...localForm, email: e.target.value })} placeholder="you@example.com" /></div>
        </div>
        <button className="primary" style={{ marginTop: 14 }} onClick={createLocalProfile}>Create local profile</button>
      </section>
    </main>
  );
}
