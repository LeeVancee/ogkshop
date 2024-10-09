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

/* export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  const { productIds, quantities, sizeIds, colorIds } = await req.json();
  if (!productIds || productIds.length === 0) {
    return new NextResponse('Product ids are required', { status: 400 });
  }

  if (!quantities || quantities.length !== productIds.length) {
    return new NextResponse('Quantities are required and should match the number of product ids', { status: 400 });
  }

  if (!sizeIds || sizeIds.length !== productIds.length) {
    return new NextResponse('Size ids are required and should match the number of product ids', { status: 400 });
  }

  if (!colorIds || colorIds.length !== productIds.length) {
    return new NextResponse('Color ids are required and should match the number of product ids', { status: 400 });
  }

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

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product, index) => {
    const size = sizeIds && sizeIds[index] ? product.sizes.find((s) => s.id === sizeIds[index]) : null;
    const color = colorIds && colorIds[index] ? product.colors.find((c) => c.id === colorIds[index]) : null;

    line_items.push({
      quantity: quantities[index],
      price_data: {
        currency: 'USD',
        product_data: {
          name: `${product.name}${size ? ` - ${size.name}` : ''}${color ? ` - ${color.name}` : ''}`,
        },
        unit_amount: product.price * 100,
      },
    });
  });

  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new NextResponse('Authorization header is missing', { status: 401 });
  }
  const userId = authHeader.split(' ')[1];
  if (!userId) {
    return new NextResponse('User id is missing', { status: 401 });
  }

  const order = await prismadb.order.create({
    data: {
      userId: userId,
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string, index: number) => ({
          product: {
            connect: {
              id: productId,
            },
          },
          size: {
            connect: {
              id: sizeIds[index],
            },
          },
          color: {
            connect: {
              id: colorIds[index],
            },
          },
          quantity: quantities[index],
        })),
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
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

  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders,
    }
  );
} */

export async function POST(req: Request, { params }: { params: Promise<{ storeId: string }> }) {
  try {
    const { productIds, quantities, sizeIds, colorIds } = await req.json();
    const { storeId } = await params;

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

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new NextResponse('Authorization header is missing', { status: 401 });
    }
    const userId = authHeader.split(' ')[1];
    if (!userId) {
      return new NextResponse('User id is missing', { status: 401 });
    }

    // 獲取所有相關產品的詳細信息
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

    // 創建一個 Map 來存儲每個唯一的產品-尺寸-顏色組合
    const uniqueItems = new Map();

    productIds.forEach((productId: string, index: number) => {
      // 在products数组中查找id与productId匹配的产品
      const product = products.find((p) => p.id === productId);

      if (!product) {
        console.error(`Product not found for id: ${productId}`);
        return; // 跳過這個項目，繼續處理下一個
      }

      // 查找与当前productId对应的sizeId
      const size = product.sizes.find((s) => s.id === sizeIds[index]);
      // 查找与当前productId对应的colorId
      const color = product.colors.find((c) => c.id === colorIds[index]);

      if (!size || !color) {
        // 如果找不到尺寸或颜色，则打印错误消息，并跳过这个项，继续处理下一个
        console.error(`Size or color not found for product: ${productId}`);
        return; // 跳過這個項目，繼續處理下一個
      }

      // 创建一个唯一键，用于标识具有相同产品、尺寸和颜色的项目
      const key = `${productId}-${sizeIds[index]}-${colorIds[index]}`;

      if (uniqueItems.has(key)) {
        // 如果uniqueItems中已经存在这个键，则增加数量
        uniqueItems.get(key).quantity += quantities[index];
      } else {
        // 否则，向uniqueItems中添加一个新项
        uniqueItems.set(key, {
          product,
          size,
          color,
          quantity: quantities[index],
        });
      }
    });

    if (uniqueItems.size === 0) {
      // 如果uniqueItems中没有任何项，则返回错误消息
      return new NextResponse('No valid items to checkout', { status: 400 });
    }

    // 从uniqueItems中提取所有的值，并将它们映射到Stripe Checkout Session的line_items格式
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = Array.from(uniqueItems.values()).map(
      ({ product, size, color, quantity }) => ({
        // 设置商品的数量
        quantity,
        // 设置商品的价格数据
        price_data: {
          // 设置货币种类为美元
          currency: 'USD',
          // 设置商品的详细数据
          product_data: {
            // 商品的名称，包括产品名称、尺寸名称和颜色名称
            name: `${product.name} - ${size.name} - ${color.name}`,
          },
          // 商品的单价，单位是美分，所以乘以100
          unit_amount: product.price * 100,
        },
      })
    );

    const order = await prismadb.order.create({
      data: {
        // 设置用户ID
        userId: userId,
        // 设置商店ID
        storeId: storeId,
        // 设置支付状态为未支付
        isPaid: false,
        // 创建订单项
        orderItems: {
          create: Array.from(uniqueItems.values()).map(({ product, size, color, quantity }) => ({
            // 连接到相应的产品
            product: {
              connect: {
                id: product.id,
              },
            },
            // 设置商品数量
            quantity,
            // 连接到相应的尺寸
            size: {
              connect: {
                id: size.id,
              },
            },
            // 连接到相应的颜色
            color: {
              connect: {
                id: color.id,
              },
            },
          })),
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
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

    return NextResponse.json(
      { url: session.url },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error('Checkout error:', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
