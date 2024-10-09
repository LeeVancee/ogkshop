import Stripe from 'stripe';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import prismadb from '@/lib/prismadb';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request, { params }: { params: Promise<{ storeId: string }> }) {
  const { orderId } = await req.json();
  const { storeId } = await params;

  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new NextResponse('Authorization header is missing', { status: 401 });
  }
  const userId = authHeader.split(' ')[1];
  if (!userId) {
    return new NextResponse('User id is missing', { status: 401 });
  }

  let order;

  if (orderId) {
    // 使用用户选择的未支付订单
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
    // 检查用户是否存在未支付的订单
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
    return new NextResponse('Order not found or already paid', { status: 404 });
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = order.orderItems.map((orderItem) => ({
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

  const session = await stripe.checkout.sessions.create({
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

  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders,
    }
  );
}
