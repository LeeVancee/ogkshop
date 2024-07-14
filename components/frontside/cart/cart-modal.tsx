import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import OpenCart from './cart';
import useCart from '@/hooks/use-cart';
import Summary from './summary';

import CartItem from './cart-item';

export function CartModal() {
  const cart = useCart();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          {/* <ShoppingBag size={20} />
        <span className="ml-1 text-sm font-medium">{cart.items.length}</span> */}
          <OpenCart quantity={cart.items.length} />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>
        <div className=" relative flex h-full  flex-col justify-between overflow-hidden p-1">
          <ul className="flex-grow overflow-auto py-4">
            {cart.items.map((item) => (
              <CartItem key={item.id} data={item} quantity={item.quantity} />
            ))}
          </ul>
          <div className=" border-neutral-300 dark:border-neutral-700">
            <div className="py-4 text-sm text-neutral-500 dark:text-white">
              <Summary />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
