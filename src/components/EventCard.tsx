import Link from 'next/link';

interface EventCardProps {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
}

export default function EventCard({ id, title, description, date, location }: EventCardProps) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>{description}</p>
      <p className="text-sm text-gray-500">{new Date(date).toLocaleString()} - {location}</p>
      <Link href={`/events/${id}`}>
        <a className="text-blue-600 mt-2 inline-block">Voir détails</a>
      </Link>
    </div>
  );
}
