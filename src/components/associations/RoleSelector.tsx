interface RoleSelectorProps {
  value: string;
  onChange: (role: string) => void;
}

export default function RoleSelector({ value, onChange }: RoleSelectorProps) {
  const roles = ['VISITEUR','MEMBRE','MEMBRE_ACTIF','ADMIN','PRESIDENT'];
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
      {roles.map(r => <option key={r} value={r}>{r}</option>)}
    </select>
  );
}