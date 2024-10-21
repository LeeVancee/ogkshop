'use server';

import prismadb from '@/lib/prismadb';

export async function deleteOrder(orderId: string) {
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
