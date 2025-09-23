import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MemberCard from '../../../components/associations/MemberCard';

export default function Dashboard() {
  const router = useRouter();
  const { slug } = router.query;
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/associations/${slug}/members`)
      .then(res => res.json())
      .then(data => setMembers(data));
  }, [slug]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <h2 className="text-2xl font-semibold mb-2">Membres</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map(m => (
          <MemberCard key={m.id} firstName={m.user.firstName} lastName={m.user.lastName} role={m.role} avatar={m.user.avatar} />
        ))}
      </div>
    </div>
  );
}