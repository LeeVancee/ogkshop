import Stripe from 'stripe';
import {NextResponse} from 'next/server';

import {stripe} from '@/lib/stripe';
import prismadb from '@/lib/prismadb';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return NextResponse.json({}, {headers: corsHeaders});
}

export async function POST(req: Request, {params}: { params: { storeId: string } }) {
    const {productIds, quantities} = await req.json();
    if (!productIds || productIds.length === 0) {
        return new NextResponse('Product ids are required', {status: 400});
    }

    if (!quantities || quantities.length !== productIds.length) {
        return new NextResponse('Quantities are required and should match the number of product ids', {status: 400});
    }

    const products = await prismadb.product.findMany({
        where: {
            id: {
                in: productIds,
            },
        },
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    products.forEach((product, index) => {
        line_items.push({
            quantity: quantities[index],
            price_data: {
                currency: 'USD',
                product_data: {
                    name: product.name,
                },
                unit_amount: product.price * 100,
            },
        });
    });

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
        return new NextResponse('Authorization header is missing', {status: 401});
    }
    const userId = authHeader.split(' ')[1];
    if (!userId) {
        return new NextResponse('User id is missing', {status: 401});
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
        {url: session.url},
        {
            headers: corsHeaders,
        }
    );
}
