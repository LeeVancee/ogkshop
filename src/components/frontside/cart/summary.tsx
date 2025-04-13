'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Currency from '@/components/frontside/currency';
import useCart from '@/hooks/use-cart';
import { toast } from 'sonner';
import ky from 'ky';
import { authClient } from '@/lib/auth-client';

const Summary = () => {
  const items = useCart((state) => state.items);
  const { data: session, isPending, error } = authClient.useSession();
  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price) * item.quantity;
  }, 0);

  const onCheckout = async () => {
    if (!session?.user) {
      toast.error('Please log in to proceed with the checkout.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await ky
        .post('/api/checkout', {
          json: {
            storeId: process.env.NEXT_PUBLIC_STORE_ID!,
            productIds: items.map((item) => item.id),
            quantities: items.map((item) => item.quantity),
            sizeIds: items.map((item) => item.selectedSize?.id || ''),
            colorIds: items.map((item) => item.selectedColor?.id || ''),
          },
          timeout: 10000, // 10秒超时
        })
        .json<{ url: string }>();

      if (response.url) {
        window.location.href = response.url;
      } else {
        toast.error('结账会话创建失败');
      }
    } catch (error) {
      toast.error('结账过程中发生错误');
      console.error('结账错误:', error);
    } finally {
      setIsLoading(false);
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
      <Button onClick={onCheckout} disabled={items.length === 0 || isLoading} className="w-full mt-6 rounded-full">
        {isLoading ? '处理中...' : 'Checkout'}
      </Button>
    </div>
  );
};

export default Summary;
