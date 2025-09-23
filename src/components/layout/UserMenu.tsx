import { useState } from 'react';
import { useCurrentAssociation } from '../../hooks/useCurrentAssociation';

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const { user } = useCurrentAssociation();

  if (!user) return null;

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 p-2 rounded">
        <span>{user.firstName}</span>
        <img src={user.avatar || '/default-avatar.png'} className="w-6 h-6 rounded-full" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded shadow z-10">
          <a href="/profile" className="block p-2 hover:bg-indigo-100 dark:hover:bg-gray-700 transition">Profil</a>
          <a href="/api/auth/logout" className="block p-2 hover:bg-indigo-100 dark:hover:bg-gray-700 transition">Déconnexion</a>
        </div>
      )}
    </div>
  );
}