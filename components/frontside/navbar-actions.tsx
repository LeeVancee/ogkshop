'use client';

import { ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import useCart from '@/hooks/use-cart';

import { Button } from '../ui/button';
import { DropDown } from './DropDown';
import { ThemeToggle } from './theme-toggle';
import Link from 'next/link';
const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/*  {!user ? (
        <SignInButton mode="modal">
          <Button variant="ghost" className="flex items-center rounded-full  px-4 py-2">
            Sign in
          </Button>
        </SignInButton>
      ) : (
        <UserButton />
      )} */}

      <Button onClick={() => router.push('/cart')} className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">{cart.items.length}</span>
      </Button>
    </>
  );
};

export default NavbarActions;
