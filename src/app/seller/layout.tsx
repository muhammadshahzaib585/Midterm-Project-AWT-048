import DashboardLayoutShared from '../dashboard-layout-shared';
import { getUser } from '@/utils/auth';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  return (
    <DashboardLayoutShared 
      userRole={user?.role} 
      userName={user?.email?.split('@')[0] || 'Seller'}
      userEmail={user?.email}
    >
      {children}
    </DashboardLayoutShared>
  );
}
