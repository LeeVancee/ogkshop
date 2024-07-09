'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import IconButton from '@/components/frontside/icon-button';
import Currency from '@/components/frontside/currency';
import useCart from '@/hooks/use-cart';
import { Product } from '@/types';
import { Input } from '@/components/ui/input';

interface CartItemProps {
  data: Product;
  quantity: number;
}

const CartItem = ({ data, quantity }: CartItemProps) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const onQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity > 0) {
      cart.updateItemQuantity(data.id, newQuantity);
    }
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image fill src={data.images[0].url} priority alt="" className="object-cover object-center" />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">{data.name}</p>
          </div>
          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data.color.name}</p>
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{data.size.name}</p>
          </div>
          <Currency value={data.price} />
        </div>
        <div className="mt-2 flex items-center">
          <label htmlFor="quantity" className="text-gray-500">
            Quantity:
          </label>
          <Input type="number" className="w-20 border ml-2 px-2 py-1" value={quantity} onChange={onQuantityChange} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
