import { getSession } from '@/actions/getSession';
import HomeLoader from '@/components/loader/home-loader';

import prismadb from '@/lib/prismadb';
import { redirect } from 'next/navigation';

// 添加动态标记，避免静态生成尝试
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await getSession();

  // 如果没有会话或用户ID，重定向到首页
  if (!session?.user?.id) {
    redirect('/');
  }

  const adminId = session.user.id;

  // 检查用户是否是 admin 用户
  const user = await prismadb.user.findUnique({
    where: {
      id: adminId,
    },
  });

  // 如果用户不存在或角色不是ADMIN，重定向到首页
  if (!user || user.role !== 'admin') {
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

  // 如果没有商店，重定向到创建页面
  redirect('/dashboard/create');
}
