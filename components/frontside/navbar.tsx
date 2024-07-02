import Link from 'next/link';

import MainNav from './main-nav';
import Container from '@/components/ui/container';
import NavbarActions from './navbar-actions';
import getCategories from '@/actions/get-categories';
import { Button } from '../ui/button';
import { DropDown } from './DropDown';
import prismadb from '@/lib/prismadb';
import { auth } from '@/auth';

const Navbar = async () => {
  const categories = await getCategories();
  const session = await auth();

  const userId = session?.user.id;

  const user = await prismadb.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return null;
  }

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">STORE</p>
          </Link>
          <MainNav data={categories} />
          <div className="ml-auto flex items-center gap-x-4">
            <DropDown user={user} />
            <NavbarActions />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
