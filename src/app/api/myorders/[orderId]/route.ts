import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { getSession } from '@/actions/getSession';

export async function DELETE(req: Request, props: { params: Promise<{ orderId: string; storeId: string }> }) {
  try {
    const params = await props.params;
    const orderId = params.orderId;

    if (!orderId) {
      return new NextResponse('订单ID是必需的', { status: 400 });
    }

    const session = await getSession();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse('未认证', { status: 401 });
    }

    // 首先检查订单是否属于当前用户
    const order = await prismadb.order.findUnique({
      where: {
        id: orderId,
        userId: userId, // 确保订单属于当前用户
      },
    });

    if (!order) {
      return new NextResponse('订单不存在或不属于当前用户', { status: 404 });
    }

    // 使用事务删除订单及其相关项
    const deletedOrder = await prismadb.$transaction([
      prismadb.orderItem.deleteMany({
        where: { orderId: orderId },
      }),
      prismadb.order.delete({
        where: {
          id: orderId,
        },
      }),
    ]);

    return NextResponse.json(deletedOrder);
  } catch (error) {
    console.error('[ORDER_DELETE_ERROR]', error);
    return new NextResponse('内部错误', { status: 500 });
  }
}
