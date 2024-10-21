'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Truck, Package, MapPin, Phone, DollarSign } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ky from 'ky';
import { AlertModal } from '@/components/frontside/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCreateOrderPaySession } from '@/features/shop/api/use-checkout';
import { useDeleteMyOrders } from '@/features/shop/api/use-delete-myorders';

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
interface OrderProps {
  order: OrderCardProps;
}

export default function OrderCard({ order }: OrderProps) {
  const session = useSession();
  const router = useRouter();
  const { id, phone, address, products, image, totalPrice, isPaid, createdAt } = order;
  const user = session.data?.user;
  const [open, setOpen] = useState(false);
  const { mutate: createOrderPaySession, isPending: isCreatingOrderPaySessionPending } = useCreateOrderPaySession();
  const { mutate: deleteOrder, isPending: isDeletingOrderPending } = useDeleteMyOrders();
  const isPending = isCreatingOrderPaySessionPending || isDeletingOrderPending;

  const handlePay = async () => {
    if (!user) {
      toast.error('Please log in to proceed with the checkout.');
      return;
    }
    createOrderPaySession({ storeId: process.env.NEXT_PUBLIC_STORE_ID!, orderId: id });
  };

  const onDelete = async () => {
    deleteOrder(id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={isPending} />
      <Card className="w-full max-w-3xl mx-auto mt-4 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-grow p-4">
            <CardHeader className="px-0 py-2">
              <CardTitle className="text-2xl font-bold text-primary">Order #{id.slice(-6)}</CardTitle>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Package className="mr-1 h-4 w-4" />
                  <span>{createdAt}</span>
                </div>
                <Badge variant={isPaid ? 'default' : 'destructive'}>{isPaid ? 'Paid' : 'Payment Pending'}</Badge>
              </div>
            </CardHeader>
            <CardContent className="px-0 py-2">
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold mb-1 flex items-center">
                    <Package className="mr-2 h-4 w-4 text-primary" />
                    Order Details
                  </h3>
                  <div className="text-sm">
                    <div className="flex justify-between py-1">
                      <span>Items:</span>
                      <span>{products}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="flex items-center">
                        <DollarSign className="mr-1 h-3 w-3 text-green-500" />
                        Total:
                      </span>
                      <span>{totalPrice}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-1 flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-primary" />
                    Shipping Information
                  </h3>
                  <address className="text-sm not-italic">
                    <div className="flex items-center py-1">
                      <Phone className="mr-2 h-3 w-3 text-gray-500" />
                      <span>{phone}</span>
                    </div>
                    <div className="flex items-center py-1">
                      <MapPin className="mr-2 h-3 w-3 text-gray-500" />
                      <span>{address}</span>
                    </div>
                  </address>
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-0 py-2 flex-col items-start">
              {isPaid ? (
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center text-xs">
                  <Truck className="h-3 w-3 mr-1" />
                  <span className="font-medium">Order Shipped</span>
                </div>
              ) : (
                <div className="flex gap-2 w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePay}
                    disabled={isPending}
                    className="text-xs py-1 px-2"
                  >
                    {isPending ? 'Processing...' : 'Pay Now'}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setOpen(true)}
                    disabled={isPending}
                    className="text-xs py-1 px-2"
                  >
                    Delete Order
                  </Button>
                </div>
              )}
            </CardFooter>
          </div>
          <div className="flex justify-center items-center sm:w-1/3">
            <div className="w-64 h-64 p-2 relative mr-4">
              <Image src={image} alt="Product image" fill className="object-cover rounded-md" />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
