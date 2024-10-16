'use client';
import { Button } from '@/components/ui/button';
import Currency from '@/components/frontside/currency';
import useCart from '@/hooks/use-cart';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import ky from 'ky';

const Summary = () => {
  const items = useCart((state) => state.items);
  const session = useSession();
  const user = session.data?.user;

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price) * item.quantity;
  }, 0);

  const onCheckout = async () => {
    if (!user) {
      toast.error('Please log in to proceed with the checkout.');
      return;
    }

    try {
      const response: any = await ky
        .post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
          json: {
            productIds: items.map((item) => item.id),
            quantities: items.map((item) => item.quantity),
            sizeIds: items.map((item) => item.selectedSize?.id),
            colorIds: items.map((item) => item.selectedColor?.id),
          },
          headers: {
            Authorization: `Bearer ${user.id}`,
          },
        })
        .json(); // 自动解析 JSON 响应

      window.location.href = response.url;
    } catch (error) {
      toast.error('Checkout failed. Please try again.');
    }
  };

  return (
    <div className="">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900 dark:text-white">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button onClick={onCheckout} disabled={items.length === 0} className="w-full mt-6 rounded-full">
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
