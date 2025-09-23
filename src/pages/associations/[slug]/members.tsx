import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MemberCard from '../../../components/associations/MemberCard';

export default function Members() {
  const router = useRouter();
  const { slug } = router.query;
  const [members, setMembers] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/associations/${slug}/members`)
      .then(res => res.json())
      .then(data => setMembers(data));
  }, [slug]);

  const filtered = members.filter(m => m.user.firstName.toLowerCase().includes(search.toLowerCase()) || m.user.lastName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Annuaire des membres</h1>
      <input type="text" placeholder="Rechercher un membre..." value={search} onChange={e => setSearch(e.target.value)}
        className="w-full p-2 mb-6 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(m => (
          <MemberCard key={m.id} firstName={m.user.firstName} lastName={m.user.lastName} role={m.role} avatar={m.user.avatar} />
        ))}
      </div>
    </div>
  );
}