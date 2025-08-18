'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthed, logout } from '@/lib/auth';

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

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8088';

  useEffect(() => {
    if (!isAuthed()) {
      router.push('/login');
      return;
    }
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        throw new Error(j?.message || 'Validation failed');
      }
      if (!res.ok) throw new Error(`API error ${res.status}`);
      setName('');
      setDescription('');
      fetchItems();
    } catch (e: any) {
      setErr(e.message || 'Failed to add item');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Items</h1>
        <button onClick={() => { logout(); }} className="text-sm underline">Logout</button>
      </div>

      <form onSubmit={addItem} className="space-y-3 bg-slate-800 p-4 rounded-xl">
        <input
          className="w-full px-3 py-2 rounded bg-slate-700 outline-none"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="w-full px-3 py-2 rounded bg-slate-700 outline-none"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {err && <p className="text-red-400 text-sm">{err}</p>}
        <button className="px-3 py-2 rounded bg-slate-600 hover:bg-slate-500 transition">Add Item</button>
      </form>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">List</h2>
        {loading ? <p>Loading...</p> : (
          <ul className="space-y-2">
            {items.map(i => (
              <li key={i._id} className="bg-slate-800 p-3 rounded">
                <div className="font-medium">{i.name}</div>
                {i.description && <div className="text-sm text-slate-300">{i.description}</div>}
                <div className="text-xs text-slate-400">{new Date(i.createdAt).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
