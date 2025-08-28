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

  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE ||
    'https://psychic-space-giggle-4j6pgjjjrx96h5w7w-8080.app.github.dev';

  // Redirect if not authenticated & fetch items
  useEffect(() => {
    if (!isAuthed()) {
      router.push('/login');
      return;
    }
    fetchItems();
  }, []);

  // Fetch all items
  async function fetchItems() {
    setLoading(true);
    setErr(null);

    try {
      const res = await fetch(`${API_BASE}/api/items`, {
        credentials: 'include', // include cookies
      });

      if (!res.ok) {
        let message = `API error ${res.status}`;
        try {
          const json = await res.json();
          message = json.message || json.error || message;
        } catch {}
        throw new Error(message);
      }

      const data = await res.json();
      setItems(data);
    } catch (e: any) {
      console.error('Fetch items error:', e);
      setErr(
        e instanceof TypeError && e.message === 'Failed to fetch'
          ? 'Network error or CORS issue. Backend might be unreachable.'
          : e.message || 'Failed to fetch items'
      );
    } finally {
      setLoading(false);
    }
  }

  // Add a new item
  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    try {
      const res = await fetch(`${API_BASE}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
        credentials: 'include',
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
      console.error('Add item error:', e);
      setErr(
        e instanceof TypeError && e.message === 'Failed to fetch'
          ? 'Network error or CORS issue. Backend might be unreachable.'
          : e.message || 'Failed to add item'
      );
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header: Logout button on the left */}
        <div className="flex items-center justify-start space-x-4">
          <button
            onClick={() => { logout(); router.push('/login'); }}
            className="text-sm underline text-blue-600"
          >
            Logout
          </button>
          <h1 className="text-2xl font-bold">Items</h1>
        </div>

        {/* Add Item Form */}
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl space-y-4">
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
            {err && <p className="text-red-500 text-sm">{err}</p>}
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Add Item
            </button>
          </form>
        </div>

        {/* Items List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-blue-600 text-left">List</h2>
          {loading ? (
            <p>Loading...</p>
          ) : items.length === 0 ? (
            <p className="text-gray-500">No items found.</p>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="p-4 shadow hover:shadow-lg rounded-lg transition bg-white"
                >
                  <div className="font-medium text-gray-800">{item.name}</div>
                  {item.description && (
                    <div className="text-gray-600 text-sm">{item.description}</div>
                  )}
                  <div className="text-gray-400 text-xs">
                    {new Date(item.createdAt).toLocaleString()}
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
