import React from 'react';

import { Metadata } from 'next';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/backside/app-sidebar';
import { Separator } from '@/components/ui/separator';

import { redirect } from 'next/navigation';
import UnauthorisedError from '@/components/unauthorized-error';
import { getSession } from '@/actions/getSession';
import prismadb from '@/lib/prismadb';

export const metadata: Metadata = {
  title: 'OGKSHOP - Dashboard',
};

export default async function DashboardLayout(props: {
  children: React.ReactNode;
  params: Promise<{ storeId: string }>;
}) {
  const params = await props.params;

  const { children } = props;

  const session = await getSession();
  const adminId = session?.user.id;
  if (session?.user.role !== 'admin') {
    return <UnauthorisedError />;
  }
  if (!session?.user) {
    redirect('/auth');
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  if (!store) {
    redirect('/');
  }
  const stores = await prismadb.store.findMany({
    where: {
      adminId: adminId,
    },
  });

  return (
    <>
      <SidebarProvider>
        <AppSidebar items={stores} />
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
