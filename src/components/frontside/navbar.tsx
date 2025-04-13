import Link from 'next/link';
import MainNav from './main-nav';

import NavbarActions from './navbar-actions';

import { DropDown } from './DropDown';
import { MobileSidebar } from './mobile-sidebar';

import { SearchModal } from './modal/search-modal';
import getCategories from '@/actions/get-categories';
import getProducts from '@/actions/get-products';
const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID!;
const Navbar = async () => {
  const categories = await getCategories({ storeId: STORE_ID });
  const allProducts = await getProducts({ storeId: STORE_ID });

  return (
    <header className="sticky inset-0 z-10 border-b bg-background/90 backdrop-blur-md">
      <nav className="px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link href="/" className="mr-4 flex lg:mr-0 gap-x-2">
            <p className="font-bold text-xl">OGKSHOP</p>
          </Link>
          <div className="hidden lg:block">
            <MainNav data={categories} />
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <SearchModal products={allProducts} />
          <NavbarActions />
          {/* <ModeToggle />*/}
          <DropDown />
          <div className=" flex lg:hidden items-center">
            <MobileSidebar data={categories} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
