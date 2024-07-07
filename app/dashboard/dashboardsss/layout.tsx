import { redirect } from 'next/navigation';
import Navbar from '@/components/backside/navbar';
import prismadb from '@/lib/prismadb';
import { auth } from '@/auth';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  if (!store) {
    redirect('/');
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
