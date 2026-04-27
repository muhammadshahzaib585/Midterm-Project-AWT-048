import DashboardLayout from '../dashboard-layout-shared';
import { requireRole } from '@/utils/auth';

export default async function BuyerLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole(['buyer', 'client', 'admin', 'Super Admin']);
  
  return (
    <DashboardLayout 
      userRole="Buyer" 
      userName={user?.email?.split('@')[0] || 'Member'}
      userEmail={user?.email || ''}
    >
      {children}
    </DashboardLayout>
  );
}
