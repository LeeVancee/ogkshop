import { auth } from '@/auth';
import Container from '@/components/ui/container';
import prismadb from '@/lib/prismadb';
import { formatter } from '@/lib/utils';
import { format } from 'date-fns';
import { OrderColumn } from '@/types';
import OrderList from './components/OrderList';

export default async function OrdersPage() {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return null; // 或者重定向到登录页
  }

  const orders = await prismadb.order.findMany({
    where: {
      userId: userId, // 添加 userId 作为查询条件
    },
    include: {
      orderItems: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
    image: item.orderItems[0].product.images[0].url,
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),

    isPaid: item.isPaid,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <Container className="min-h-screen">
      <OrderList orders={formattedOrders} />
    </Container>
  );
}
