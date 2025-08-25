'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, isAuthed, logout } from '../../lib/auth';

type Item = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
};

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080';

  useEffect(() => {
    if (!isAuthed()) {
      router.push('/login');
      return;
    }
    fetchItems();
  }, []);

  async function fetchItems() {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch(`${API_BASE}/api/items`);
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      setItems(data);
    } catch (e: any) {
      setErr(e.message || 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  }

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      const res = await fetch(`${API_BASE}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
      });
      if (res.status === 400) {
        const j = await res.json();
        throw new Error(j?.details?.name || 'Validation failed');
      }
      if (!res.ok) throw new Error(`API error ${res.status}`);
      setName('');
      setDescription('');
      await fetchItems();
    } catch (e: any) {
      setErr(e.message || 'Failed to add item');
    }
  }

  return (
    <div className="container">
      <div className="card max-w-4xl w-full space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1>Items</h1>
          <button
            onClick={() => { logout(); router.push('/login'); }}
            className="text-sm underline"
          >
            Logout
          </button>
        </div>

        {/* Add Item Form */}
        <div className="bg-white shadow-lg rounded-xl p-6 text-left w-full max-w-3xl mx-auto -mt-6 space-y-4">
          <form onSubmit={addItem} className="space-y-4">
            <input
              className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 outline-none focus:border-blue-500"
              placeholder="Item name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 outline-none focus:border-blue-500"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {err && <p className="text-red-400 text-sm">{err}</p>}
            <button type="submit" className="btn btn-green px-4 py-1 text-sm">
              Add Item
            </button>
          </form>
        </div>

        {/* Items List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-left text-blue-600">List</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="space-y-3">
              {items.map((i) => (
                <li key={i.id} className="card text-left hover:shadow-lg transition p-4">
                  <div className="font-medium text-gray-800">{i.name}</div>
                  {i.description && (
                    <div className="text-gray-600 text-sm">{i.description}</div>
                  )}
                  <div className="text-gray-400 text-xs">
                    {new Date(i.createdAt).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
