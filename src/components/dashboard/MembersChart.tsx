import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function MembersChart({ data }: { data: { date: string; members: number }[] }) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-glass animate-fade">
      <h3 className="text-lg font-semibold mb-4">Évolution des membres</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="members" stroke="#2563EB" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}