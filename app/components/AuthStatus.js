'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AuthStatus() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('healgut_current_user') || 'null'));
  }, []);

  return (
    <Link href={user ? '/dashboard' : '/login'}>
      {user ? `👤 ${user.name || 'Dashboard'}` : '👤 Login'}
    </Link>
  );
}
