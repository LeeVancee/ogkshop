import {redirect} from 'next/navigation';
import prismadb from '@/lib/prismadb';
import {auth} from '@/auth';
import React from "react";

export default async function SetupLayout({children}: { children: React.ReactNode }) {
    const session = await auth();
    const adminId = session?.user.id;


    // 检查用户是否已登录，以及是否是 admin 用户
    const user = await prismadb.user.findUnique({
        where: {
            id: adminId,
            roles: 'ADMIN',
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

    return <>{children}</>;
}
