import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function InvitationPage() {
  const router = useRouter();
  const { token } = router.query;
  const [invitation, setInvitation] = useState<any>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!token) return;
    fetch(`/api/invitations/${token}`)
      .then(res => res.json())
      .then(data => setInvitation(data));
  }, [token]);

  const handleAccept = async () => {
    if (!invitation) return;
    const res = await fetch(`/api/invitations/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: email }),
    });
    if (res.ok) router.push('/');
  };

  if (!invitation) return <p>Chargement...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Invitation à rejoindre {invitation.associationId}</h1>
      <input type="text" placeholder="Votre email" value={email} onChange={e => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-indigo-500" />
      <button onClick={handleAccept} className="w-full bg-indigo-600 text-white rounded p-2 hover:bg-indigo-700 transition">Accepter l'invitation</button>
    </div>
  );
}