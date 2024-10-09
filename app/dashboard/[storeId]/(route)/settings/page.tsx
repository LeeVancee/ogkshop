import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import { SettingsForm } from './components/settings-form';
import { auth } from '@/auth';

interface SettingsPageProps {
  params: Promise<{ storeId: string }>;
}
const SettingsPage = async ({ params }: SettingsPageProps) => {
  const session = await auth();
  const userId = session?.user.id;
  const { storeId } = await params;
  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      adminId: userId,
    },
  });

  if (!store) {
    redirect('/');
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
