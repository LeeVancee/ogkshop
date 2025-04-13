import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import prismadb from '@/lib/prismadb';
import { getSession } from '@/features/auth/getSession';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { storeId, orderId } = body;

    const session = await getSession();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    let order;

    if (orderId) {
      order = await prismadb.order.findUnique({
        where: {
          id: orderId,
        },
        include: {
          orderItems: {
            include: {
              product: true,
              size: true,
              color: true,
            },
          },
        },
      });
    } else {
      order = await prismadb.order.findFirst({
        where: {
          userId: userId,
          storeId: storeId,
          isPaid: false,
        },
        include: {
          orderItems: {
            include: {
              product: true,
              size: true,
              color: true,
            },
          },
        },
      });
    }

    if (!order || order.isPaid) {
      return new NextResponse('Order not found or already paid', { status: 400 });
    }

    const line_items = order.orderItems.map((orderItem) => ({
      quantity: orderItem.quantity,
      price_data: {
        currency: 'USD',
        product_data: {
          name: `${orderItem.product.name}${orderItem.size ? ` - ${orderItem.size.name}` : ''}${
            orderItem.color ? ` - ${orderItem.color.name}` : ''
          }`,
        },
        unit_amount: orderItem.product.price * 100,
      },
    }));

    const stripeSession = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.FRONTEND_STORE_URL}/myorders?success=1`,
      cancel_url: `${process.env.FRONTEND_STORE_URL}/myorders?canceled=1`,
      metadata: {
        orderId: order.id,
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error('[ORDER_PAYMENT_ERROR]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
