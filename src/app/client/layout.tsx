import DashboardLayoutShared from '../dashboard-layout-shared';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutShared>{children}</DashboardLayoutShared>;
}
