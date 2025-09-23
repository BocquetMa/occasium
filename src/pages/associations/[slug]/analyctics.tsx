import DashboardLayout from '../../../components/layout/DashboardLayout';
import StatsCards from '../../../components/dashboard/StatsCards';
import MembersChart from '../../../components/dashboard/MembersChart';
import EventsCalendar from '../../../components/dashboard/EventsCalendar';
import RecentActivity from '../../../components/dashboard/RecentActivity';
import QuickActions from '../../../components/dashboard/QuickActions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function AnalyticsPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/associations/${slug}/analytics`)
      .then(res => res.json())
      .then(setData);
  }, [slug]);

  if (!data) return <div className="p-4">Chargement...</div>;

  return (
    <DashboardLayout>
      <QuickActions associationSlug={slug as string} />
      <StatsCards members={data.membersCount} events={data.eventsCount} revenue={data.revenue} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <MembersChart data={data.membersOverTime} />
        <EventsCalendar events={data.events.map((e: any) => ({ title: e.title, start: new Date(e.date), end: new Date(e.endDate) }))} />
      </div>
      <RecentActivity activities={data.recentActivities} />
    </DashboardLayout>
  );
}