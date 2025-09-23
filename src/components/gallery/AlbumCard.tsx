import Link from 'next/link';
import Image from 'next/image';

export default function AlbumCard({ album }: { album: { id: number; title: string; coverUrl?: string; photosCount: number } }) {
  return (
    <Link href={`/associations/albums/${album.id}`}>
      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-glass overflow-hidden hover:shadow-xl transition cursor-pointer">
        {album.coverUrl && <Image src={album.coverUrl} alt={album.title} width={400} height={250} className="object-cover w-full h-48" />}
        <div className="p-4">
          <h3 className="font-semibold">{album.title}</h3>
          <p className="text-sm text-gray-500">{album.photosCount} photos</p>
        </div>
      </div>
    </Link>
  );
}