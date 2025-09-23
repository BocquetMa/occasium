import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '../ui/Button';

export default function PhotoUpload({ albumId, onUploaded }: { albumId: number; onUploaded?: () => void }) {
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => setFiles(acceptedFiles),
  });

  const upload = async () => {
    const formData = new FormData();
    files.forEach(f => formData.append('photos', f));
    formData.append('albumId', albumId.toString());

    await fetch('/api/upload/photos', { method: 'POST', body: formData });
    setFiles([]);
    onUploaded?.();
  };

  return (
    <div className="mb-4">
      <div {...getRootProps()} className="p-4 border-2 border-dashed rounded cursor-pointer hover:border-primary transition">
        <input {...getInputProps()} />
        <p>Glissez vos images ici ou cliquez pour sélectionner</p>
      </div>
      {files.length > 0 && (
        <div className="mt-2 flex gap-2 flex-wrap">
          {files.map((f) => (
            <img key={f.name} src={URL.createObjectURL(f)} className="w-24 h-24 object-cover rounded" />
          ))}
        </div>
      )}
      <Button onClick={upload} disabled={files.length === 0}>Uploader</Button>
    </div>
  );
}