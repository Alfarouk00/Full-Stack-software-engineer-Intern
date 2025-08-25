'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, isAuthed } from '../../lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

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
    <div className="container">
      <div className="card max-w-sm w-full">
        <h1>Login</h1>
        <p className="text-gray-600 mb-6">Enter your username and password to sign in.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            className="w-full px-3 py-2 rounded bg-gray-100 outline-none border border-gray-300 focus:border-blue-500"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full px-3 py-2 rounded bg-gray-100 outline-none border border-gray-300 focus:border-blue-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" className="btn btn-blue w-full">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
