'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthed, logout } from '../lib/auth';

export default function AuthButton() {
  const [authed, setAuthed] = useState(isAuthed());
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setAuthed(false);
    router.push('/');
  };

  // Listen to changes in localStorage to update auth state
  useEffect(() => {
    const onStorage = () => setAuthed(isAuthed());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return authed ? (
    <button onClick={handleLogout} className="underline text-blue-600 text-sm">
      Logout
    </button>
  ) : (
    <a className="underline" href="/login">
      Login
    </a>
  );
}
