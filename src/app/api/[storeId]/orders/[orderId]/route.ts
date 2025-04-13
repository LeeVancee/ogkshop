import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  props: { params: Promise<{ orderId: string; storeId: string }> }
) {
  const params = await props.params;
  try {
    if (!params.orderId) {
      return new NextResponse('Order id is required', { status: 400 });
    }

    const order = await prismadb.$transaction([
      prismadb.orderItem.deleteMany({
        where: { orderId: params.orderId },
      }),
      prismadb.order.delete({
        where: {
          id: params.orderId,
        },
      }),
    ]);

    return NextResponse.json(order);
  } catch (error) {
    console.log('[COLOR_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
