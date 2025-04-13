import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import prismadb from '@/lib/prismadb';
import { getSession } from '@/features/auth/getSession';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { storeId, productIds, quantities, sizeIds, colorIds } = body;

    const session = await getSession();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
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
      return new NextResponse('Invalid request data', { status: 400 });
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
      return new NextResponse('No valid items to checkout', { status: 400 });
    }

    const line_items = Array.from(uniqueItems.values()).map(({ product, size, color, quantity }) => ({
      quantity,
      price_data: {
        currency: 'USD',
        product_data: {
          name: `${product.name} - ${size.name} - ${color.name}`,
        },
        unit_amount: product.price * 100,
      },
    }));

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

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error('[CHECKOUT_ERROR]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
