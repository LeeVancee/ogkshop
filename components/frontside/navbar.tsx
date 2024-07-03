import Link from 'next/link';
import MainNav from './main-nav';
import Container from '@/components/ui/container';
import NavbarActions from './navbar-actions';
import getCategories from '@/actions/get-categories';
import { DropDown } from './DropDown';

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">STORE</p>
          </Link>
          <MainNav data={categories} />
          <div className="ml-auto flex items-center gap-x-4">
            <DropDown />
            <NavbarActions />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
