import { useEffect, useState } from 'react';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import Pagination from '../components/Pagination';

export default function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const fetchEvents = async () => {
  try {
    const res = await fetch(`/api/events/index?page=${page}&search=${search}`);
    const data = await res.json();
    console.log('API response:', data); 
    setEvents(Array.isArray(data) ? data : []);
    setTotalPages(1);
  } catch (err) {
    console.error('Fetch events failed', err);
    setEvents([]);
  }
};

  useEffect(() => { fetchEvents(); }, [page, search]);

  return (
    <>
      <Header/>
      <div className="p-4">
        <input placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} className="border p-2 mb-4 w-full"/>
        <div className="grid md:grid-cols-3 gap-4">
          {events.map(e => <EventCard key={e.id} {...e} />)}
        </div>
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </>
  );
}
