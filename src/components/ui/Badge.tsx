export default function Badge({ children, color = 'primary' }: { children: React.ReactNode; color?: 'primary' | 'secondary' | 'accent' }) {
  const colors = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    accent: 'bg-accent text-white',
  };
  return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[color]}`}>{children}</span>;
}