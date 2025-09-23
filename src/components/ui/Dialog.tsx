import { ReactNode } from 'react';

export default function Dialog({ children, open }: { children: ReactNode; open: boolean }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade">
      <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg w-full max-w-lg">
        {children}
      </div>
    </div>
  );
}