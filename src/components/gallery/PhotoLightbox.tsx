import { useState } from 'react';

export default function PhotoLightbox({ photos, initialIndex = 0, onClose }: { photos: { url: string; caption?: string }[]; initialIndex?: number; onClose?: () => void }) {
  const [index, setIndex] = useState(initialIndex);

  const prev = () => setIndex((i) => (i === 0 ? photos.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === photos.length - 1 ? 0 : i + 1));

  if (!photos.length) return null;

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-white text-2xl">&times;</button>
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-2xl">&#8249;</button>
        <img src={photos[index].url} className="max-h-[80vh] max-w-[90vw] object-contain rounded" />
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-2xl">&#8250;</button>
        {photos[index].caption && <div className="text-white text-center mt-2">{photos[index].caption}</div>}
      </div>
    </div>
  );
}