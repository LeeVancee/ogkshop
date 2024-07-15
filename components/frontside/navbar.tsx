import Link from 'next/link';
import MainNav from './main-nav';
import Container from '@/components/ui/container';
import NavbarActions from './navbar-actions';
import getCategories from '@/actions/get-categories';
import { DropDown } from './DropDown';
import { MobileSidebar } from './mobile-sidebar';
import { ModeToggle } from '../modeToggle';

const STORE_ID = 'fab17ed6-6ad8-4356-b872-b26250a8764e';

const Navbar = async () => {
  const categories = await getCategories({ storeId: STORE_ID });

  return (
    <header className="sticky inset-0 z-50  border-b bg-background/90 backdrop-blur-md">
      <Container>
        <nav className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">OGKSHOP</p>
          </Link>
          <div className="hidden lg:block">
            <MainNav data={categories} />
          </div>

          <div className="ml-auto flex items-center gap-x-4">
            <DropDown />

            <NavbarActions />
            <ModeToggle />
          </div>

          <div className=" lg:hidden flex items-center justify-center h-full ml-3">
            <MobileSidebar categories={categories} />
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
