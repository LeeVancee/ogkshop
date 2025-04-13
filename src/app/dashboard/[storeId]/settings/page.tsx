import { getSession } from '@/actions/getSession';
import { SettingsForm } from './components/settings-form';
import prismadb from '@/lib/prismadb';

const SettingsPage = async () => {
  const session = await getSession();
  const adminId = session?.user.id;

  const store = await prismadb.store.findFirst({
    where: {
      adminId: adminId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store!} />
      </div>
    </div>
  );
};

export default SettingsPage;
