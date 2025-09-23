export default function GradientBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full bg-gradient-to-r from-primary via-secondary to-accent animate-gradient bg-[length:400%_400%]">
      {children}
    </div>
  );
}