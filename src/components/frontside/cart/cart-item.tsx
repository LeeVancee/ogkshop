'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import useCart from '@/hooks/use-cart';
import { Product, Size, Color } from '@/types';
import QuantitySelector from './quantity-selector';

interface CartItemProps {
  data: Product;
  quantity: number;
  selectedSize: Size;
  selectedColor: Color;
}

const CartItem = ({ data, quantity, selectedSize, selectedColor }: CartItemProps) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id, selectedSize, selectedColor);
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    cart.updateItemQuantity(itemId, selectedSize, selectedColor, newQuantity);
  };

  return (
    <div>
      <li className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700">
        <div className="relative flex w-full flex-row justify-between px-1 py-4">
          <div className="absolute z-40 -mt-2 ml-[55px]">
            <button
              onClick={onRemove}
              aria-label="Remove cart item"
              aria-disabled="false"
              className=" flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white/80 p-0.5 text-neutral-500 "
            >
              <X />
            </button>
            <p aria-live="polite" className="sr-only" role="status"></p>
          </div>
          <div className="flex h-16 w-16">
            <Image
              width={64}
              height={64}
              src={data.images[0].url}
              priority
              alt=""
              className="object-cover object-center"
            />
          </div>

          <div className="flex flex-1 flex-col text-base ml-2">
            <span className="leading-tight">{data.name}</span>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {selectedColor.name} / {selectedSize.name}
            </p>
          </div>

          <div className="flex h-16 flex-col justify-between">
            <p className="flex justify-end space-y-2 text-right text-sm">
              ${(data.price * quantity).toFixed(2)}
              <span className="ml-1 inline">USD</span>
            </p>
            <div className="ml-auto flex h-9 flex-row items-center rounded-full border-neutral-200 dark:border-neutral-700">
              <QuantitySelector
                initialQuantity={quantity}
                onChange={(newQuantity) => handleQuantityChange(data.id, newQuantity)}
              />
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

export default CartItem;
