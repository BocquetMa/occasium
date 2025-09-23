import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Event {
  id: number;
  title: string;
  date: string;
  location?: string;
}

export default function Events() {
  const router = useRouter();
  const { slug } = router.query;
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/associations/${slug}`)
      .then(res => res.json())
      .then(data => setEvents(data.events || []));
  }, [slug]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Événements</h1>
      <div className="space-y-4">
        {events.map(e => (
          <div key={e.id} className="p-4 rounded shadow bg-white dark:bg-gray-800 hover:shadow-lg transition">
            <h2 className="font-semibold text-xl">{e.title}</h2>
            <p className="text-sm text-gray-500">{new Date(e.date).toLocaleDateString()} {e.location && `- ${e.location}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}