import React from 'react';
import { DropDown } from '@/components/backside/DropDown';
import { Metadata } from 'next';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/backside/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'OGKSHOP - Dashboard',
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect('/auth');
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
            <div className="flex items-center gap-x-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
