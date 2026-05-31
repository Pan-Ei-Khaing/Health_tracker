'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from '../components/Nav';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
const userKey = 'healgut_current_user';
const tokenKey = 'healgut_auth_token';

const loginSteps = [
  'Open Login Page',
  'Click Continue with Google',
  'Google popup opens',
  'Select Google account',
  'Allow permission first time only',
  'Google sends email, name, profile picture, and Google ID',
  'Backend checks if email already exists',
  'Existing email logs in; new email creates an account',
  'Backend generates JWT session token',
  'Redirect to Dashboard',
];

export default function LoginPage() {
  const router = useRouter();
  const renderedGoogleButton = useRef(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('');
  const [localForm, setLocalForm] = useState({ name: '', email: '' });

  const saveSession = (authData) => {
    const nextUser = authData.user || authData;
    const nextToken = authData.token || '';

    localStorage.setItem(userKey, JSON.stringify(nextUser));
    if (nextToken) localStorage.setItem(tokenKey, nextToken);

    setUser(nextUser);
    setToken(nextToken);
    setStatus(`${authData.message || 'Login successful'} — redirecting to Dashboard...`);

    setTimeout(() => {
      router.push(authData.redirectTo || '/dashboard');
    }, 700);
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem(userKey) || 'null');
    const savedToken = localStorage.getItem(tokenKey) || '';
    setUser(savedUser);
    setToken(savedToken);
  }, []);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !window.google || renderedGoogleButton.current) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: async (response) => {
        setStatus('Google account selected. Verifying with backend...');
        try {
          const res = await fetch(`${API_BASE}/api/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential: response.credential }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || data.details || 'Google login failed');
          saveSession(data);
        } catch (err) {
          setStatus(err.message);
        }
      },
    });

    window.google.accounts.id.renderButton(document.getElementById('googleSignIn'), {
      theme: 'outline',
      size: 'large',
      type: 'standard',
      text: 'continue_with',
      shape: 'pill',
      logo_alignment: 'left',
      width: 300,
    });
    renderedGoogleButton.current = true;
  }, [router]);

  const createLocalProfile = async () => {
    if (!localForm.email.trim()) return alert('Please enter an email.');
    setStatus('Creating local test profile and session token...');
    try {
      const res = await fetch(`${API_BASE}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not create profile');
      saveSession(data);
    } catch (err) {
      setStatus(err.message);
    }
  };

  const signOut = () => {
    localStorage.removeItem(userKey);
    localStorage.removeItem(tokenKey);
    setUser(null);
    setToken('');
    setStatus('Signed out.');
  };

  return (
    <main className="page">
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      <Nav />

      <section className="hero">
        <span className="badge" style={{ background: '#dcfce7', color: '#166534' }}>Secure Google sign in</span>
        <h1 style={{ fontSize: '2.8rem', margin: '12px 0 8px' }}>👤 Login / Register</h1>
        <p style={{ maxWidth: 760, lineHeight: 1.7 }}>
          Continue with Google to create or access your Health Tracker account. The backend checks your email, saves your Google profile, creates a JWT session token, then redirects you to your Dashboard.
        </p>
      </section>

      <section className="grid grid-2" style={{ marginTop: 20 }}>
        <div className="card" style={{ padding: 24 }}>
          <h2>Continue with Google</h2>
          {!GOOGLE_CLIENT_ID && (
            <p className="disclaimer">
              Google OAuth Client ID is not configured yet. Add NEXT_PUBLIC_GOOGLE_CLIENT_ID in frontend and GOOGLE_CLIENT_ID in backend.
            </p>
          )}
          <div id="googleSignIn" style={{ marginTop: 16, minHeight: 44 }}></div>
          <p style={{ color: '#4f6356', lineHeight: 1.6 }}>
            First-time users are asked for permission once. Returning users are logged in with the same email account.
          </p>
          {status && <p className="disclaimer" style={{ marginTop: 14 }}>{status}</p>}
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h2>Current session</h2>
          {user ? (
            <div>
              {user.avatar_url && <img src={user.avatar_url} alt="Profile" style={{ width: 72, height: 72, borderRadius: '50%', border: '3px solid #dcfce7' }} />}
              <p><strong>{user.name || 'Unnamed user'}</strong></p>
              <p>{user.email}</p>
              <p><span className="badge" style={{ background: '#e8f4ff', color: '#1d4ed8' }}>Provider: {user.auth_provider || 'local'}</span></p>
              <p><span className="badge" style={{ background: token ? '#dcfce7' : '#fee2e2', color: token ? '#166534' : '#991b1b' }}>{token ? 'JWT token created' : 'No token found'}</span></p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
                <Link className="primary" style={{ textDecoration: 'none' }} href="/dashboard">Go to Dashboard</Link>
                <button className="secondary" onClick={signOut}>Sign out</button>
              </div>
            </div>
          ) : (
            <p>No user logged in yet.</p>
          )}
        </div>
      </section>

      <section className="card" style={{ padding: 24, marginTop: 20 }}>
        <h2>Login flow</h2>
        <div className="grid grid-2">
          {loginSteps.map((step, index) => (
            <div key={step} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: 12, border: '1px solid #dbeadd', borderRadius: 16, background: '#fbfffb' }}>
              <span className="badge" style={{ background: '#15803d', color: '#fff', minWidth: 34, justifyContent: 'center' }}>{index + 1}</span>
              <span style={{ fontWeight: 700, color: '#214d32' }}>{step}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="card" style={{ padding: 24, marginTop: 20 }}>
        <h2>Local test profile</h2>
        <p style={{ color: '#4f6356' }}>
          Use this only while Google OAuth Client ID is not ready. It creates/updates a user row and now also returns a JWT session token.
        </p>
        <div className="grid grid-2">
          <div><label className="label">Name</label><input className="input" value={localForm.name} onChange={(e) => setLocalForm({ ...localForm, name: e.target.value })} placeholder="Pan Ei" /></div>
          <div><label className="label">Email</label><input className="input" value={localForm.email} onChange={(e) => setLocalForm({ ...localForm, email: e.target.value })} placeholder="you@example.com" /></div>
        </div>
        <button className="primary" style={{ marginTop: 14 }} onClick={createLocalProfile}>Create test profile & go Dashboard</button>
      </section>
    </main>
  );
}
