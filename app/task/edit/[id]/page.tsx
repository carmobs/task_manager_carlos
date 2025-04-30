'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FiClipboard } from "react-icons/fi";

export default function EditTask() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id: taskId } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (!taskId) {
          throw new Error('Task ID is missing');
        }

        const res = await fetch(`/api/tasks?id=${taskId}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch task');
        }

        const task = await res.json();
        setTitle(task.title);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error fetching task:', err.message);
          setError(err.message || 'Failed to load task. Redirecting to dashboard...');
        } else {
          console.error('Unknown error fetching task:', err);
          setError('An unknown error occurred. Redirecting to dashboard...');
        }
        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
      }
    };

    fetchTask();
  }, [taskId, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/tasks?id=${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update task');
      }

      router.push('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error updating task:', err.message);
        setError(err.message || 'Failed to update task. Please try again.');
      } else {
        console.error('Unknown error updating task:', err);
        setError('An unknown error occurred. Please try again.');
      }
    }
  };

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4">
        <p>Loading...</p>
      </div>
    );
  }

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
      <form onSubmit={handleUpdate} className="p-8 max-w-lg mx-auto bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-orange-600">Edit Task</h1>
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
          Update Task
        </button>
      </form>
    </div>
  );
}
