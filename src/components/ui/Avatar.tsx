export default function Avatar({ src, size = 10 }: { src?: string; size?: number }) {
  return (
    <img
      src={src || '/default-avatar.png'}
      className={`rounded-full object-cover w-${size} h-${size} shadow`}
      alt="avatar"
    />
  );
}