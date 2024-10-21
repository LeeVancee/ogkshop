'use server';

import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import prismadb from '@/lib/prismadb';
import { auth } from '@/auth';

export async function createCheckoutSession(
  storeId: string,
  productIds: string[],
  quantities: number[],
  sizeIds: string[],
  colorIds: string[]
) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  if (
    !productIds ||
    !quantities ||
    !sizeIds ||
    !colorIds ||
    productIds.length !== quantities.length ||
    productIds.length !== sizeIds.length ||
    productIds.length !== colorIds.length
  ) {
    throw new Error('Invalid request data');
  }

  // 获取所有相关产品的详细信息
  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    include: {
      sizes: true,
      colors: true,
    },
  });

  // 创建一个 Map 来存储每个唯一的产品-尺寸-颜色组合
  const uniqueItems = new Map();

  productIds.forEach((productId: string, index: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) {
      console.error(`Product not found for id: ${productId}`);
      return;
    }

    const size = product.sizes.find((s) => s.id === sizeIds[index]);
    const color = product.colors.find((c) => c.id === colorIds[index]);

    if (!size || !color) {
      console.error(`Size or color not found for product: ${productId}`);
      return;
    }

    const key = `${productId}-${sizeIds[index]}-${colorIds[index]}`;

    if (uniqueItems.has(key)) {
      uniqueItems.get(key).quantity += quantities[index];
    } else {
      uniqueItems.set(key, {
        product,
        size,
        color,
        quantity: quantities[index],
      });
    }
  });

  if (uniqueItems.size === 0) {
    throw new Error('No valid items to checkout');
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = Array.from(uniqueItems.values()).map(
    ({ product, size, color, quantity }) => ({
      quantity,
      price_data: {
        currency: 'USD',
        product_data: {
          name: `${product.name} - ${size.name} - ${color.name}`,
        },
        unit_amount: product.price * 100,
      },
    })
  );

  const order = await prismadb.order.create({
    data: {
      userId: userId,
      storeId: storeId,
      isPaid: false,
      orderItems: {
        create: Array.from(uniqueItems.values()).map(({ product, size, color, quantity }) => ({
          product: {
            connect: {
              id: product.id,
            },
          },
          quantity,
          size: {
            connect: {
              id: size.id,
            },
          },
          color: {
            connect: {
              id: color.id,
            },
          },
        })),
      },
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/myorders/?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/myorders/?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  return { url: stripeSession.url };
}

export async function createOrderPaySession(storeId: string, orderId?: string) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error('Unauthenticated');
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
    throw new Error('Order not found or already paid');
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

  return { url: stripeSession.url };
}
