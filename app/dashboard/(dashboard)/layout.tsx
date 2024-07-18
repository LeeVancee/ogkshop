import {redirect} from 'next/navigation';
import prismadb from '@/lib/prismadb';
import Header from '@/components/backside/header';
import Sidebar from '@/components/backside/sidebar';

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
            <Header/>
            <div className="flex h-screen overflow-hidden">
                <Sidebar/>
                <main className="flex-1 overflow-hidden pt-16">{children}</main>
            </div>
        </>
    );
}
