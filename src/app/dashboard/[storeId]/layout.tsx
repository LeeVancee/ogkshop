import { Metadata } from 'next';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/backside/app-sidebar';
import { getSession } from '@/features/auth/getSession';
import { redirect } from 'next/navigation';
import { SiteHeader } from '@/components/backside/site-header';

export const metadata: Metadata = {
  title: 'OGKSHOP - Dashboard',
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (session?.user.role !== 'admin') {
    redirect('/unauthorized');
  }
  if (!session?.user) {
    redirect('/auth');
  }

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">{children}</div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
