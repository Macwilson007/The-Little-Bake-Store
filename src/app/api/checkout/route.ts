import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

function generateOrderNumber() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'LBS-';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export async function POST(request: Request) {
    try {
        const { items, customer, delivery, subtotal, deliveryFee, total } = await request.json();

        // 1. Create the order in the database
        const order = await prisma.order.create({
            data: {
                orderNumber: generateOrderNumber(),
                totalAmount: total,
                deliveryFee: deliveryFee,
                paymentMethod: customer.paymentMethod || 'card',
                paymentStatus: 'UNPAID', // Unpaid matches PayStatus.UNPAID
                status: 'PENDING',

                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
                phone: customer.phone,
                address: customer.address,
                city: customer.city,
                state: customer.state || 'FCT',
                deliveryOption: customer.deliveryOption || 'standard',

                orderItems: {
                    create: items.map((item: any) => ({
                        productId: item.product.id,
                        quantity: item.quantity,
                        priceAtPurchase: item.product.price,
                    })),
                },
            },
        });

        // 2. Initialize Paystack Transaction
        const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: customer.email,
                amount: Math.round(total * 100), // Paystack works in kobo
                callback_url: `${process.env.APP_URL}/checkout/verify`,
                metadata: {
                    orderId: order.id,
                },
            }),
        });

        const paystackData = await paystackRes.json();

        if (!paystackData.status) {
            console.error('Paystack Init Error:', paystackData);
            return NextResponse.json({ error: 'Failed to initialize payment' }, { status: 500 });
        }

        // 3. Update order with Paystack reference
        await prisma.order.update({
            where: { id: order.id },
            data: {
                paystackRef: paystackData.data.reference
            }
        });

        return NextResponse.json({
            url: paystackData.data.authorization_url,
            orderId: order.id
        });

    } catch (error) {
        console.error('Checkout Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
