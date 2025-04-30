'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push('/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center text-orange-600">Register</h1>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded w-full hover:bg-orange-600 transition"
        >
          Register
        </button>
        <a
          href="/"
          className="block text-center text-gray-500 mt-4 hover:underline"
        >
          Back to Home
        </a>
      </form>
    </div>
  );
}
