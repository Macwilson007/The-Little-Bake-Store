import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

export async function POST(request: Request) {
    try {
        const body = await request.text();
        const hash = crypto.createHmac('sha512', PAYSTACK_SECRET!).update(body).digest('hex');

        if (hash !== request.headers.get('x-paystack-signature')) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }

        const event = JSON.parse(body);

        if (event.event === 'charge.success') {
            const data = event.data;
            const orderId = data.metadata.orderId;

            // Updated Order with payment confirmation
            await prisma.order.update({
                where: { id: orderId },
                data: {
                    paymentStatus: 'PAID',
                    status: 'PREPARING',
                },
            });
        }

        return NextResponse.json({ status: 'received' });
    } catch (error) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
