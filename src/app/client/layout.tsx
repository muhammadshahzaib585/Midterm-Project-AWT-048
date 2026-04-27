import DashboardLayoutShared from '../dashboard-layout-shared';
import { requireRole } from '@/utils/auth';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await requireRole(['seller', 'admin', 'Super Admin', 'Seller', 'Admin']);

  return (
    <DashboardLayoutShared 
      userRole={user?.role} 
      userName={user?.email?.split('@')[0] || 'Member'}
      userEmail={user?.email}
    >
      {children}
    </DashboardLayoutShared>
  );
}
