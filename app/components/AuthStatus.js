'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AuthStatus() {
  const [user, setUser] = useState(null);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('healgut_current_user') || 'null'));
    setHasCheckedSession(true);
  }, []);

  if (!hasCheckedSession) {
    return <Link href="/dashboard">👤 Account</Link>;
  }

  return (
    <Link href={user ? '/dashboard' : '/login'}>
      {user ? `👤 ${user.name || 'Dashboard'}` : '👤 Login'}
    </Link>
  );
}
