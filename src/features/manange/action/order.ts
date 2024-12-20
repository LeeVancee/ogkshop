'use server';

import prismadb from '@/lib/prismadb';
import { getSession } from '@/features/auth/getSession';

export async function deleteOrder(orderId: string) {
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  if (!orderId) {
    throw new Error('Order id is required');
  }

  try {
    const order = await prismadb.$transaction([
      prismadb.orderItem.deleteMany({
        where: { orderId: orderId },
      }),
      prismadb.order.delete({
        where: {
          id: orderId,
        },
      }),
    ]);

    return order;
  } catch (error) {
    console.error('[ORDER_DELETE]', error);
    throw new Error('Failed to delete order');
  }
}
