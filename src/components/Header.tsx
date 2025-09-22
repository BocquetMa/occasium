import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setUser(data.user || null));
  }, []);

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      {/* Supprime l'a à l'intérieur */}
      <Link href="/" className="font-bold">MyEvents</Link>

      <nav className="space-x-4">
        {user ? (
          <>
            <span>{user.name}</span>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/api/auth/logout">Logout</Link>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
