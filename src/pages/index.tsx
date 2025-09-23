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