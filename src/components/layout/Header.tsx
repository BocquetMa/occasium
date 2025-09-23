import AssociationSwitcher from './AssociationSwitcher';
import UserMenu from './UserMenu';
import Link from 'next/link';
import { useCurrentAssociation } from '../../hooks/useCurrentAssociation';

export default function Header() {
  const { currentAssociation } = useCurrentAssociation();

  return (
    <header className="bg-white dark:bg-gray-800 shadow flex justify-between items-center px-6 py-3">
      <Link href="/" className="text-xl font-bold text-indigo-600">Associahub</Link>
      <div className="flex items-center space-x-4">
        {currentAssociation && <AssociationSwitcher />}
        <UserMenu />
      </div>
    </header>
  );
}