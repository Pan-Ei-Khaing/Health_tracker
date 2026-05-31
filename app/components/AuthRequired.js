'use client';

import Link from 'next/link';

export default function AuthRequired({ feature = 'this feature' }) {
  return (
    <section className="card" style={{ padding: 24, marginTop: 20, textAlign: 'center' }}>
      <h2>Login required</h2>
      <p style={{ color: '#4f6356', lineHeight: 1.6 }}>
        Please sign in or create a profile before using {feature}. This keeps the saved data connected to the correct user account.
      </p>
      <Link className="primary" href="/login" style={{ display: 'inline-block', marginTop: 12, textDecoration: 'none' }}>
        Sign in / Register
      </Link>
    </section>
  );
}
