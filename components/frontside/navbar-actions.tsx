'use client';

import { ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import useCart from '@/hooks/use-cart';

import OpenCart from './cart/cart';
import { CartModal } from './cart/cart-modal';
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
      {/* <button onClick={() => router.push('/cart')}>
        <OpenCart quantity={cart.items.length} />
      </button> */}
      <CartModal />
    </>
  );
};

export default NavbarActions;
