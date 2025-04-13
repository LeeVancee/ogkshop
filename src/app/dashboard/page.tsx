import { getSession } from '@/actions/getSession';
import HomeLoader from '@/components/loader/home-loader';

import prismadb from '@/lib/prismadb';
import { redirect, useRouter } from 'next/navigation';
export default async function DashboardPage() {
  const session = await getSession();

  const adminId = session?.user.id;

  // 检查用户是否已登录，以及是否是 admin 用户
  const user = await prismadb.user.findUnique({
    where: {
      id: adminId,
      role: 'ADMIN',
    },
  });

  if (!user) {
    redirect('/');
  }

  const store = await prismadb.store.findFirst({
    where: {
      adminId: adminId,
    },
  });

  if (store) {
    redirect(`/dashboard/${store.id}`);
  }

  if (!store) {
    redirect('/dashboard/create');
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <HomeLoader />
    </div>
  );
}
