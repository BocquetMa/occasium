export default function RecentActivity({ activities }: { activities: { user: string; action: string; date: string }[] }) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-glass animate-fade">
      <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
      <ul className="space-y-2">
        {activities.map((act, idx) => (
          <li key={idx} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <span className="font-semibold">{act.user}</span> {act.action} <span className="text-gray-500 text-sm">({act.date})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}