'use client';

export const SESSION_KEY = 'session';

export function login(username: string, password: string): boolean {
  if (username === 'admin' && password === 'password') {
    localStorage.setItem(SESSION_KEY, 'admin');
    return true;
  }
  return false;
}

export function isAuthed(): boolean {
  return typeof window !== 'undefined' && !!localStorage.getItem(SESSION_KEY);
}

export function logout() {
  if (typeof window !== 'undefined') localStorage.removeItem(SESSION_KEY);
}
