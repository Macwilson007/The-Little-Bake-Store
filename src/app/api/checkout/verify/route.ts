import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const trxref = searchParams.get('trxref') || searchParams.get('reference');

    if (!trxref) {
        return NextResponse.json({ error: 'Missing reference' }, { status: 400 });
    }

    try {
        // Verify with Paystack
        const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${trxref}`, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET}`,
            },
        });

        const paystackData = await paystackRes.json();

        if (paystackData.status && paystackData.data.status === 'success') {
            const orderId = paystackData.data.metadata.orderId;

            // Update order status in database
            await prisma.order.update({
                where: { id: orderId },
                data: {
                    paymentStatus: 'PAID',
                    status: 'PREPARING',
                },
            });

            return NextResponse.json({ status: 'success', orderId });
        }

        return NextResponse.json({ status: 'failed' });

    } catch (error) {
        console.error('Verification Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
