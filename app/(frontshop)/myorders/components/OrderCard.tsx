/**
 * v0 by Vercel.
 * @see https://v0.dev/t/F7iYYr5qlC4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';
import { AlertModal } from '@/components/frontside/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import axios from 'axios';
import { Truck } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface OrderCardProps {
  id: string;
  phone: string;
  address: string;
  products: string;
  image: string;
  totalPrice: string;
  isPaid: boolean;
  createdAt: string;
}

export default function OrderCard({
  id,
  phone,
  address,
  products,
  totalPrice,
  isPaid,
  createdAt,
  image,
}: OrderCardProps) {
  const router = useRouter();
  const session = useSession();
  const user = session.data?.user;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (!user) {
      toast.error('Please log in to proceed with the checkout.');
      return;
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/orderpay`,
      {
        orderId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${user.id}`,
        },
      }
    );
    window.location.href = response.data.url;
  };

  const onDelete = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/deleteorder`, {
        data: {
          orderId: id,
        },
      });
      toast.success('Order deleted.');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
      <Card className="mt-5">
        <div className="grid grid-cols-2">
          <div className="">
            <CardHeader>
              <CardTitle>Order</CardTitle>
              <CardDescription>Placed on {createdAt}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium">Order Details</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <span className="font-medium">Items:</span> {products}
                    </li>
                    <li>
                      <span className="font-medium">Total:</span> {totalPrice}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Shipping Information</h3>
                  <address className="space-y-1 text-sm not-italic">
                    <div>Phone: {phone}</div>
                    <div>{address}</div>
                  </address>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-2">
                {isPaid ? (
                  <>
                    <Truck className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-primary">Order Shipped</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-medium text-red-500">Payment Pending</span>
                    <Button variant="outline" size="sm" onClick={handlePay}>
                      Pay Now
                    </Button>
                    <Button disabled={loading} variant="destructive" size="sm" onClick={() => setOpen(true)}>
                      Delete Order
                    </Button>
                  </>
                )}
              </div>
            </CardFooter>
          </div>

          <div className="flex justify-center items-center">
            <div className="ml-auto w-[200px] h-[200px] p-4">
              <Image src={image} alt="product image" width={200} height={200} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
