/**
 * v0 by Vercel.
 * @see https://v0.dev/t/F7iYYr5qlC4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Truck } from 'lucide-react';

interface OrderCardProps {
  id: string;
  phone: string;
  address: string;
  products: string;
  totalPrice: string;
  isPaid: boolean;
  createdAt: string;
}

export default function OrderCard({ id, phone, address, products, totalPrice, isPaid, createdAt }: OrderCardProps) {
  return (
    <Card className="mt-5">
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
            <span className="text-sm font-medium text-red-500">Payment Pending</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
