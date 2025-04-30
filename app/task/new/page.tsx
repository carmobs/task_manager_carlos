'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiClipboard } from "react-icons/fi";

export default function NewTask() {
  const [title, setTitle] = useState('');
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    if (res.ok) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-orange-500 text-white py-4 px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FiClipboard className="text-2xl" />
          <h1 className="text-2xl font-bold">Task Manager</h1>
        </div>
      </nav>

      {/* Main Content */}
      <form onSubmit={handleCreate} className="p-8 max-w-lg mx-auto bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-orange-600">Create New Task</h1>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="border p-2 rounded w-full mb-4"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
