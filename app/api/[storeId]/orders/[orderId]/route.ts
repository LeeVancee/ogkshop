import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: Promise<{ orderId: string; storeId: string }> }) {
  try {
    const { orderId, storeId } = await params;
    if (!orderId) {
      return new NextResponse('Order id is required', { status: 400 });
    }

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

    return NextResponse.json(order);
  } catch (error) {
    console.log('[COLOR_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
