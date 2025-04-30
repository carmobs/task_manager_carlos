'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 border border-white text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
    >
      Logout
    </button>
  );
}
