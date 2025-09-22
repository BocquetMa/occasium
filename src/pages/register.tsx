import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
      credentials: 'include',
    });
    if (res.ok) router.push('/login');
  };

  return (
    <>
      <Header/>
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} className="border p-2 w-full"/>
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="border p-2 w-full"/>
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="border p-2 w-full"/>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
        </form>
      </div>
    </>
  );
}
