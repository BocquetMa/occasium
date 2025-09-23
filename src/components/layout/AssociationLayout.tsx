import AppLayout from './AppLayout';
import Breadcrumbs from './Breadcrumbs';

export default function AssociationLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout>
      <Breadcrumbs />
      {children}
    </AppLayout>
  );
}