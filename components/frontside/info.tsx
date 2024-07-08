'use client';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import Currency from './currency';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import useCart from '@/hooks/use-cart';
import { Input } from '../ui/input';

interface InfoProps {
  data: Product;
}

const Info = ({ data }: InfoProps) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);

  const onAddToCart = () => {
    cart.addItem(data, quantity);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{data?.size?.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div>{data?.color?.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Quantity:</h3>
          <Input
            type="number"
            className="w-20"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={onAddToCart} className="flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Info;
