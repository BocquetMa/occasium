import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import EventForm from '../../components/EventForm';

export default function CreateEvent() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (!data.user) router.push('/login');
        else setUser(data.user);
      });
  }, []);

  const handleSubmit = async (formData: any) => {
    const res = await fetch('/api/events/index', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(formData),
    });
    if (res.ok) router.push('/');
  };

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Create Event</h1>
        <EventForm onSubmit={handleSubmit} />
      </div>
    </>
  );
}
