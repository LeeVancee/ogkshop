/**
 * v0 by Vercel.
 * @see https://v0.dev/t/F7iYYr5qlC4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';
import { AlertModal } from '@/components/frontside/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import axios from 'axios';
import { Truck, Package, MapPin, Phone, DollarSign } from 'lucide-react';
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

export default function OrderCard({ id, phone, address, products, isPaid, image, totalPrice }: OrderCardProps) {
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
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orderpay`,
        { orderId: id },
        { headers: { Authorization: `Bearer ${user.id}` } }
      );
      window.location.href = response.data.url;
    } catch (error) {
      toast.error('Payment initiation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/deleteorder`, {
        data: { orderId: id },
      });
      toast.success('Order deleted.');
      router.refresh();
    } catch (error) {
      toast.error('Failed to delete order. Please try again.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
      <Card className="mt-4 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-grow p-4">
            <CardHeader className="px-0 py-2">
              <CardTitle className="text-lg font-bold text-primary">Order #{id.slice(-6)}</CardTitle>
            </CardHeader>
            <CardContent className="px-0 py-2">
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="text-base font-semibold mb-1 flex items-center">
                    <Package className="mr-2 h-4 w-4 text-primary" />
                    Order Details
                  </h3>
                  <ul className="space-y-1">
                    <li className="flex items-center">
                      <span className="font-medium mr-2">Items:</span> {products}
                    </li>
                    <li className="flex items-center">
                      <DollarSign className="mr-2 h-3 w-3 text-green-500" />
                      <span className="font-medium">Total:</span> {totalPrice}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-1 flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-primary" />
                    Shipping Information
                  </h3>
                  <address className="space-y-1 not-italic">
                    <div className="flex items-center">
                      <Phone className="mr-2 h-3 w-3 text-gray-500" />
                      {phone}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-3 w-3 text-gray-500" />
                      {address}
                    </div>
                  </address>
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-0 py-2 flex-col items-start">
              <div className="flex items-center gap-2 mb-2">
                {isPaid ? (
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center text-xs">
                    <Truck className="h-3 w-3 mr-1" />
                    <span className="font-medium">Order Shipped</span>
                  </div>
                ) : (
                  <span className="text-xs font-medium text-red-500 bg-red-100 px-2 py-1 rounded-full">
                    Payment Pending
                  </span>
                )}
              </div>
              {!isPaid && (
                <div className="flex gap-2 w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePay}
                    disabled={loading}
                    className="text-xs py-1 px-2"
                  >
                    {loading ? 'Processing...' : 'Pay Now'}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setOpen(true)}
                    disabled={loading}
                    className="text-xs py-1 px-2"
                  >
                    Delete Order
                  </Button>
                </div>
              )}
            </CardFooter>
          </div>
          <div className="flex justify-center items-center sm:w-1/3">
            <div className="w-64 h-64 p-2">
              <Image src={image} alt="product image" width={256} height={256} className="object-cover rounded-md" />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
