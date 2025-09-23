import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AssociationCard from '../../../components/associations/AssociationCard';
import MemberCard from '../../../components/associations/MemberCard';

interface Association {
  id: number;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  memberships?: { id: number; role: string; user: { firstName: string; lastName: string; avatar?: string } }[];
}

export default function AssociationPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [association, setAssociation] = useState<Association | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/associations/${slug}`)
      .then(res => res.json())
      .then(data => setAssociation(data));
  }, [slug]);

  if (!association) return <p>Chargement...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{association.name}</h1>
      <p className="mb-6">{association.description}</p>

      <h2 className="text-2xl font-semibold mb-2">Membres publics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {association.memberships?.map(m => (
          <MemberCard key={m.id} firstName={m.user.firstName} lastName={m.user.lastName} role={m.role} avatar={m.user.avatar} />
        ))}
      </div>
    </div>
  );
}