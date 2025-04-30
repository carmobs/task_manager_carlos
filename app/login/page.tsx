'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center text-orange-600">Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
          Login
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
