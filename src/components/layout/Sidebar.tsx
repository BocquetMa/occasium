import Link from 'next/link';
import { useCurrentAssociation } from '../../hooks/useCurrentAssociation';
import { usePermissions } from '../../hooks/usePermissions';

export default function Sidebar() {
  const { currentAssociation } = useCurrentAssociation();
  const { canManageAssociation } = usePermissions();

  if (!currentAssociation) return null;

  return (
    <aside className="w-64 bg-gray-100 dark:bg-gray-900 h-full p-4 space-y-2">
      <Link href={`/associations/${currentAssociation.slug}`} className="block p-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-800 transition">Vue générale</Link>
      <Link href={`/associations/${currentAssociation.slug}/members`} className="block p-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-800 transition">Membres</Link>
      <Link href={`/associations/${currentAssociation.slug}/events`} className="block p-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-800 transition">Événements</Link>
      {canManageAssociation(currentAssociation.slug) && (
        <Link href={`/associations/${currentAssociation.slug}/dashboard`} className="block p-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-800 transition">Dashboard</Link>
      )}
    </aside>
  );
}