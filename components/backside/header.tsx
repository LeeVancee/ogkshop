import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from './user-nav';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { DropDown } from './DropDown';
import StoreSwitcher from './store-switcher';
import { auth } from '@/auth';
import prismadb from '@/lib/prismadb';

export default async function Header() {
  const session = await auth();
  const adminId = session?.user.id;

  // const userId = '78c5a8de-dfea-4bbc-bb7d-981ea0f12a91';
  const stores = await prismadb.store.findMany({
    where: {
      adminId: adminId,
    },
  });
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className="hidden lg:block">
          <StoreSwitcher items={stores} />
        </div>
        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          {/* <UserNav /> */}
          <Link href="/" className="text-sm">
            back to store
          </Link>
          <DropDown />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
