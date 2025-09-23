import { useState } from 'react';

export default function Dropdown({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button onClick={() => setOpen(!open)} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">{label}</button>
      {open && <div className="absolute mt-2 bg-white dark:bg-zinc-800 shadow-lg rounded">{children}</div>}
    </div>
  );
}