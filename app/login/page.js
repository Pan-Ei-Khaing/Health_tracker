'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '../components/Nav';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
const userKey = 'healgut_current_user';
const tokenKey = 'healgut_auth_token';

export default function LoginPage() {
  const router = useRouter();
  const renderedGoogleButton = useRef(false);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const saveSession = (authData) => {
    const nextUser = authData.user;

    localStorage.setItem(userKey, JSON.stringify(nextUser));
    localStorage.setItem(tokenKey, authData.token);
    setUser(nextUser);
    setStatus('Signed in successfully. Redirecting...');

    router.push(authData.redirectTo || '/dashboard');
  };

  const [googleReady, setGoogleReady] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem(userKey) || 'null'));

    if (window.google?.accounts?.id) {
      setGoogleReady(true);
      return;
    }

    const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => setGoogleReady(true), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => setGoogleReady(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !googleReady || !window.google || renderedGoogleButton.current) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: async (response) => {
        setIsSigningIn(true);
        setStatus('Signing in...');
        try {
          const res = await fetch(`${API_BASE}/api/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential: response.credential }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || data.details || 'Google sign-in failed.');
          saveSession(data);
        } catch (err) {
          setStatus(err.message);
        } finally {
          setIsSigningIn(false);
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
      width: 320,
    });
    renderedGoogleButton.current = true;
  }, [googleReady, router]);

  const signOut = () => {
    localStorage.removeItem(userKey);
    localStorage.removeItem(tokenKey);
    setUser(null);
    setStatus('Signed out.');
  };

  return (
    <main className="page">
      <Nav />

      <section className="hero" style={{ maxWidth: 760, margin: '48px auto 0', textAlign: 'center' }}>
        <span className="badge" style={{ background: '#dcfce7', color: '#166534' }}>Secure sign in</span>
        <h1 style={{ fontSize: '2.8rem', margin: '14px 0 10px' }}>Sign in to Health Tracker</h1>
        <p style={{ maxWidth: 560, margin: '0 auto', lineHeight: 1.7, color: '#496153' }}>
          Use your Google account to securely access your dashboard, diet plans, symptom logs, and trigger journal.
        </p>
      </section>

      <section className="card" style={{ maxWidth: 460, margin: '24px auto 0', padding: 28, textAlign: 'center' }}>
        {user ? (
          <div>
            {user.avatar_url && <img src={user.avatar_url} alt="Profile" style={{ width: 76, height: 76, borderRadius: '50%', border: '3px solid #dcfce7' }} />}
            <h2 style={{ marginBottom: 6 }}>Welcome back{user.name ? `, ${user.name}` : ''}</h2>
            <p style={{ color: '#52685a', marginTop: 0 }}>{user.email}</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 18 }}>
              <button className="primary" onClick={() => router.push('/dashboard')}>Continue</button>
              <button className="secondary" onClick={signOut}>Use another account</button>
            </div>
          </div>
        ) : (
          <div>
            <h2 style={{ marginTop: 0 }}>Continue with Google</h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
              {GOOGLE_CLIENT_ID ? (
                <div id="googleSignIn" style={{ minHeight: 44 }}></div>
              ) : (
                <p className="disclaimer" style={{ textAlign: 'left' }}>Google sign-in is temporarily unavailable. Please configure Google OAuth to enable login.</p>
              )}
            </div>
            {isSigningIn && <p style={{ color: '#4f6356', marginTop: 16 }}>Please wait...</p>}
          </div>
        )}

        {status && <p className="disclaimer" style={{ marginTop: 18, textAlign: 'left' }}>{status}</p>}
      </section>
    </main>
  );
}
