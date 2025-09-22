import { useEffect, useState } from 'react';
import Header from '../components/Header';
import EventCard from '../components/EventCard';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setUser(data.user || null));
  }, []);

  useEffect(() => {
    if (!user) return;
    const endpoint = user.role === 'ORGANIZER' ? `/api/events/index?organizerId=${user.id}` : '/api/events/index';
    fetch(endpoint, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setEvents(data));
  }, [user]);

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <Header/>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Dashboard</h1>
        <div className="grid md:grid-cols-3 gap-4">
          {events.map(e => <EventCard key={e.id} {...e} />)}
        </div>
      </div>
    </>
  );
}
