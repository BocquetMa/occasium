import Link from 'next/link';

interface AssociationCardProps {
  name: string;
  slug: string;
  description?: string;
  logo?: string;
}

export default function AssociationCard({ name, slug, description, logo }: AssociationCardProps) {
  return (
    <Link href={`/associations/${slug}`} className="block bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:scale-105 transform transition duration-300 p-6">
      <div className="flex items-center space-x-4">
        {logo && <img src={logo} alt={name} className="w-16 h-16 rounded-full object-cover border-2 border-white" />}
        <div>
          <h3 className="text-xl font-bold">{name}</h3>
          {description && <p className="text-sm mt-1 line-clamp-2">{description}</p>}
        </div>
      </div>
    </Link>
  );
}