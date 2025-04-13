import Container from '@/components/ui/container';
import prismadb from '@/lib/prismadb';
import { formatter } from '@/lib/utils';
import { format } from 'date-fns';
import { OrderColumn } from '@/types';
import OrderList from './components/OrderList';
import { getSession } from '@/actions/getSession';

export default async function OrdersPage() {
  const session = await getSession();
  const userId = session?.user.id;

  // 即使未登录用户也返回空数组，而不是 null
  let formattedOrders: OrderColumn[] = [];

  if (userId) {
    const orders = await prismadb.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                images: true,
                sizes: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    formattedOrders = orders.map((item) => {
      // 确保订单项和图片存在
      const hasOrderItems = item.orderItems && item.orderItems.length > 0;
      const hasImages =
        hasOrderItems && item.orderItems[0].product.images && item.orderItems[0].product.images.length > 0;

      return {
        id: item.id,
        phone: item.phone || '',
        address: item.address || '',
        products: hasOrderItems
          ? item.orderItems.map((orderItem) => orderItem.product.name || 'Product').join(', ')
          : '',
        image: hasImages ? item.orderItems[0].product.images[0].url : '/placeholder.jpg', // 使用占位图片

        totalPrice: formatter.format(
          hasOrderItems
            ? item.orderItems.reduce((total, orderItem) => {
                return total + (orderItem.product.price || 0) * (orderItem.quantity || 1);
              }, 0)
            : 0
        ),

        isPaid: item.isPaid || false,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
      };
    });
  }

  return (
    <Container className="min-h-screen">
      <OrderList initialOrders={formattedOrders} />
    </Container>
  );
}
