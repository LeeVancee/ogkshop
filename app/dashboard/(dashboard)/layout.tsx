import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import NavBar from '@/components/backside/nav';
import React from 'react';
import StoreSwitcher from '@/components/backside/store-switcher';
import { auth } from '@/auth';
import { DropDown } from '@/components/backside/DropDown';
import Link from 'next/link';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const session = await auth();
  const adminId = session?.user.id;
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
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <StoreSwitcher items={stores} />
            </div>
            <div className="flex-1">
              <NavBar />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center justify-between border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <div className="flex-1">{/* 这里可以放置其他左侧内容 */}</div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-sm ">
                Back to store
              </Link>
              <DropDown />
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
        </div>
      </div>
    </>
  );
}
