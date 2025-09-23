import AppLayout from './AppLayout';
import Breadcrumbs from './Breadcrumbs';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout>
      <div className="flex flex-col md:flex-row">
        <aside className="md:w-64 p-4 bg-gray-100 dark:bg-gray-900 rounded mb-4 md:mb-0">{/* Stats / quick links */}</aside>
        <div className="flex-1 p-4">
          <Breadcrumbs />
          {children}
        </div>
      </div>
    </AppLayout>
  );
}