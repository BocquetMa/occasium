import { useCurrentAssociation } from '../../hooks/useCurrentAssociation';
import { useState } from 'react';

export default function AssociationSwitcher() {
  const { associations, currentAssociation, setCurrentAssociation } = useCurrentAssociation();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition">
        {currentAssociation?.name || 'Sélectionner une association'}
      </button>
      {open && (
        <div className="absolute mt-2 bg-white dark:bg-gray-800 rounded shadow w-64 z-10">
          {associations.map(a => (
            <button key={a.id} onClick={() => { setCurrentAssociation(a); setOpen(false); }} 
              className="block w-full text-left p-2 hover:bg-indigo-100 dark:hover:bg-gray-700 transition">
              {a.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}