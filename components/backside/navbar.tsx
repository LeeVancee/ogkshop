import StoreSwitcher from './store-switcher';
import { MainNav } from './main-nav';
import { ThemeToggle } from './theme-toggle';
import prismadb from '@/lib/prismadb';
import { auth } from '@/auth';
import { DropDown } from './DropDown';
import Link from 'next/link';

const Navbar = async () => {
  const session = await auth();
  const adminId = session?.user.id;

  // const userId = '78c5a8de-dfea-4bbc-bb7d-981ea0f12a91';
  const stores = await prismadb.store.findMany({
    where: {
      adminId: adminId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          {/* <RightNav /> */}
          <Link href="/" className="text-sm">
            back to store
          </Link>
          <ThemeToggle />
          <DropDown />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
