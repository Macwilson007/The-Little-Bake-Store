import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendOrderStatusEmail } from '@/lib/email';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const { status } = await request.json();

    try {
        const order = await prisma.order.update({
            where: { id },
            data: { status }
        });

        // Send email notification to customer
        await sendOrderStatusEmail(
            order.email,
            `${order.firstName} ${order.lastName}`,
            order.orderNumber,
            status
        );

        return NextResponse.json(order);
    } catch (error) {
        console.error('Failed to update order:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}
