import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AlbumCard from '../../../components/gallery/AlbumCard';
import PhotoUpload from '../../../components/gallery/PhotoUpload';

export default function GalleryPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [albums, setAlbums] = useState<any[]>([]);

  const fetchAlbums = async () => {
    if (!slug) return;
    const res = await fetch(`/api/associations/${slug}/albums`);
    const data = await res.json();
    setAlbums(data);
  };

  useEffect(() => { fetchAlbums(); }, [slug]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Galerie</h1>
      <PhotoUpload albumId={0} onUploaded={fetchAlbums} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {albums.map(album => <AlbumCard key={album.id} album={{...album, coverUrl: album.photos[0]?.url, photosCount: album.photos.length}} />)}
      </div>
    </div>
  );
}