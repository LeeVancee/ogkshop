'use client';

import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import Currency from './currency';
import { Button } from '@/components/ui/button';
import { Product, Size, Color } from '@/types';
import useCart from '@/hooks/use-cart';
import QuantitySelector from './cart/quantity-selector';
import { cn } from '@/lib/utils';
import usePreviewModal from '@/hooks/use-preview-modal';

interface InfoProps {
  data: Product;
}

const Info = ({ data }: InfoProps) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const { onClose: closeModal } = usePreviewModal();

  const onAddToCart = () => {
    if (selectedSize && selectedColor) {
      cart.addItem(data, selectedSize, selectedColor, quantity);
      closeModal();
    } else {
      alert('Please select both size and color before adding to cart.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-2xl">
          <Currency value={data?.price} />
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold">Size:</h3>
          <div className="flex gap-2">
            {data?.sizes?.map((size) => (
              <Button
                key={size.id}
                onClick={() => setSelectedSize(size)}
                variant="outline"
                className={cn(
                  'border',
                  selectedSize?.id === size.id
                    ? 'border-black text-black'
                    : 'border-gray-300 text-gray-700 dark:text-white dark:border-neutral-700'
                )}
              >
                {size.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold">Color:</h3>
          <div className="flex gap-2">
            {data?.colors?.map((color) => (
              <Button
                key={color.id}
                onClick={() => setSelectedColor(color)}
                variant="outline"
                className={cn(
                  'border',
                  selectedColor?.id === color.id
                    ? 'border-black text-black'
                    : 'border-gray-300 text-gray-700 dark:text-white dark:border-neutral-700'
                )}
              >
                {color.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold">Quantity:</h3>
          <QuantitySelector initialQuantity={quantity} onChange={setQuantity} />
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={onAddToCart} className="flex items-center gap-x-2" disabled={!selectedSize || !selectedColor}>
          Add To Cart
          <ShoppingCart size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Info;
