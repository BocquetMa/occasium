import Image from 'next/image';

export default function PhotoGrid({ photos, onClick }: { photos: { id: number; url: string; caption?: string }[]; onClick?: (index: number) => void }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {photos.map((photo, idx) => (
        <div key={photo.id} className="relative cursor-pointer" onClick={() => onClick?.(idx)}>
          <Image src={photo.url} alt={photo.caption || 'photo'} width={400} height={300} className="object-cover rounded hover:scale-105 transition-transform" />
        </div>
      ))}
    </div>
  );
}