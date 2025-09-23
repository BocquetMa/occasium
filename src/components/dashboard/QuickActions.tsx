import Button from '../ui/Button';
import Link from 'next/link';

export default function QuickActions({ associationSlug }: { associationSlug: string }) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <Link href={`/associations/${associationSlug}/events/create`}>
        <Button>Nouvel événement</Button>
      </Link>
      <Link href={`/associations/${associationSlug}/members/invite`}>
        <Button>Inviter membre</Button>
      </Link>
    </div>
  );
}