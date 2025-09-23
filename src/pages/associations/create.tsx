// FILE: components/associations/RoleSelector.tsx
interface RoleSelectorProps {
  value: string;
  onChange: (role: string) => void;
}

export default function RoleSelector({ value, onChange }: RoleSelectorProps) {
  const roles = ['VISITEUR','MEMBRE','MEMBRE_ACTIF','ADMIN','PRESIDENT'];
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
      {roles.map(r => <option key={r} value={r}>{r}</option>)}
    </select>
  );
}
tsx
Copier le code
// FILE: pages/index.tsx
import { useEffect, useState } from 'react';
import AssociationCard from '../components/associations/AssociationCard';

interface Association {
  id: number;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
}

export default function Home() {
  const [associations, setAssociations] = useState<Association[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/associations')
      .then(res => res.json())
      .then(data => setAssociations(data));
  }, []);

  const filtered = associations.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Associations</h1>
      <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)}
        className="w-full p-2 mb-6 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(a => <AssociationCard key={a.id} {...a} />)}
      </div>
    </div>
  );
}
tsx
Copier le code
// FILE: pages/associations/create.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CreateAssociation() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/associations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, slug, description }),
    });
    if (res.ok) router.push(`/associations/${slug}`);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Créer une association</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="text" placeholder="Nom" value={name} onChange={e => setName(e.target.value)}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500" required />
        <input type="text" placeholder="Slug" value={slug} onChange={e => setSlug(e.target.value)}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500" required />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500" />
        <button type="submit" className="w-full p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">Créer</button>
      </form>
    </div>
  );
}