import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: { orderId: string; storeId: string } }) {
  try {
    if (!params.orderId) {
      return new NextResponse('Order id is required', { status: 400 });
    }
    await prismadb.orderItem.deleteMany({
      where: { orderId: params.orderId },
    });

    const order = await prismadb.order.delete({
      where: {
        id: params.orderId,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log('[COLOR_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
