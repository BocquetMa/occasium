import { FaUsers, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';

export default function StatsCards({ members, events, revenue }: { members: number; events: number; revenue: number }) {
  const stats = [
    { label: 'Membres', value: members, icon: FaUsers, color: 'bg-primary' },
    { label: 'Événements', value: events, icon: FaCalendarAlt, color: 'bg-secondary' },
    { label: 'Revenus', value: revenue, icon: FaDollarSign, color: 'bg-accent' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="p-4 rounded-xl shadow-glass hover:shadow-xl transition flex items-center justify-between">
            <div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
            <div className={`${stat.color} text-white p-3 rounded-full`}>
              <Icon />
            </div>
          </div>
        );
      })}
    </div>
  );
}