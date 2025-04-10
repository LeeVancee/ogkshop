'use client';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import OpenCart from './cart';
import useCart from '@/hooks/use-cart';
import Summary from './summary';
import CartItem from './cart-item';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export function CartModal() {
  const cart = useCart();

  const removeAll = () => {
    cart.removeAll();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative h-9 w-9" aria-label="Open cart">
          <OpenCart quantity={cart.items.length} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="text-xl font-bold">My Cart</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col justify-between overflow-hidden">
          {cart.items.length > 0 ? (
            <>
              <div className="flex items-center justify-between border-b px-3 py-2">
                <span className="text-sm text-muted-foreground">共 {cart.items.length} items</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeAll}
                  className="h-8 text-destructive hover:text-destructive/90"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Cart
                </Button>
              </div>
              <ul className="flex-1 overflow-auto py-3">
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
              <div className="border-t bg-background p-3">
                <Summary />
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center space-y-4">
              <div className="text-muted-foreground">Empty Cart</div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
