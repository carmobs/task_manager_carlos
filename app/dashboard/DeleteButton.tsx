'use client';

export default function DeleteButton({ taskId }: { taskId: number }) {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/tasks?id=${taskId}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('Failed to delete task');
      }
      location.reload();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
    >
      Delete
    </button>
  );
}
