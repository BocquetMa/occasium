import { useState } from 'react';

interface InviteFormProps {
  onSubmit: (email: string, role: string) => void;
}

export default function InviteForm({ onSubmit }: InviteFormProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('MEMBRE');

  return (
    <form className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(email, role); }}>
      <div>
        <label className="block text-sm font-medium mb-1">Email du membre</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
          className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Rôle</label>
        <select value={role} onChange={e => setRole(e.target.value)}
          className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
          <option value="MEMBRE">Membre</option>
          <option value="MEMBRE_ACTIF">Membre Actif</option>
          <option value="ADMIN">Admin</option>
          <option value="PRESIDENT">Président</option>
        </select>
      </div>
      <button type="submit" className="w-full bg-indigo-600 text-white rounded p-2 hover:bg-indigo-700 transition">Envoyer l’invitation</button>
    </form>
  );
}