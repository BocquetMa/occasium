import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Breadcrumbs() {
  const router = useRouter();
  const segments = router.asPath.split('/').filter(Boolean);

  return (
    <nav className="text-gray-500 dark:text-gray-400 text-sm mb-4">
      <ol className="flex space-x-2">
        <li><Link href="/" className="hover:underline">Accueil</Link></li>
        {segments.map((seg, idx) => {
          const path = '/' + segments.slice(0, idx + 1).join('/');
          return (
            <li key={path}>
              <span>/</span>
              <Link href={path} className="ml-1 hover:underline">{decodeURIComponent(seg)}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
