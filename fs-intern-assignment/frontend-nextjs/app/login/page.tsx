'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, isAuthed } from '@/lib/auth';
import { useEffect } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (isAuthed()) router.push('/items');
  }, [router]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(username, password);
    if (ok) {
      router.push('/items');
    } else {
      setError('Invalid credentials. Try admin / password');
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3 bg-slate-800 p-4 rounded-xl">
        <input
          className="w-full px-3 py-2 rounded bg-slate-700 outline-none"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 rounded bg-slate-700 outline-none"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button className="w-full px-3 py-2 rounded bg-slate-600 hover:bg-slate-500 transition">
          Sign in
        </button>
      </form>
    </div>
  );
}
