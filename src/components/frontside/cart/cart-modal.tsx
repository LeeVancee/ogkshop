'use client';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import OpenCart from './cart';
import useCart from '@/hooks/use-cart';
import Summary from './summary';
import CartItem from './cart-item';
import { Button } from '@/components/ui/button';

export function CartModal() {
  const cart = useCart();

  const removeAll = () => {
    cart.removeAll();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open cart">
          <OpenCart quantity={cart.items.length} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>

        <div className="relative flex h-full flex-col justify-between overflow-hidden">
          <div className="border-neutral-300 dark:border-neutral-700 pt-3">
            <Button variant="outline" size="sm" onClick={removeAll}>
              Remove All
            </Button>
          </div>
          <ul className="flex-grow overflow-auto py-4">
            {cart.items.map((item) => (
              <CartItem
                key={`${item.id}-${item.selectedSize.id}-${item.selectedColor.id}`}
                data={item}
                quantity={item.quantity}
                selectedSize={item.selectedSize}
                selectedColor={item.selectedColor}
              />
            ))}
          </ul>
          <div className="border-neutral-300 dark:border-neutral-700">
            <div className="py-4 text-sm text-neutral-500 dark:text-white">
              <Summary />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
