export default function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-glass hover:shadow-xl transition ${className}`}>
      {children}
    </div>
  );
}