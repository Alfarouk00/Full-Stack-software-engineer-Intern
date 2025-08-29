'use client';

export const SESSION_KEY = 'session';

// lib/auth.ts
export function login(username: string, password: string) {
  // hardcoded for now
  if (username === 'admin' && password === 'password') {
    localStorage.setItem('authed', 'true');
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem('authed');
}

export function isAuthed() {
  return localStorage.getItem('authed') === 'true';
}
