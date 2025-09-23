export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} />
  );
}

export function Spinner({ size = 6 }: { size?: number }) {
  return (
    <div className={`w-${size} h-${size} border-4 border-t-primary border-r-secondary border-b-accent border-l-gray-200 rounded-full animate-spin`} />
  );
}