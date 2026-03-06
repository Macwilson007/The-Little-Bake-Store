import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const settings = await prisma.siteSettings.findUnique({
            where: { id: 'standard' }
        });
        const testimonials = await prisma.testimonial.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json({ settings, testimonials });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, data } = body;

        if (type === 'settings') {
            const updated = await prisma.siteSettings.upsert({
                where: { id: 'standard' },
                update: data,
                create: { id: 'standard', ...data }
            });
            return NextResponse.json(updated);
        }

        if (type === 'testimonial') {
            const { id, ...rest } = data;
            if (id) {
                const updated = await prisma.testimonial.update({
                    where: { id },
                    data: rest
                });
                return NextResponse.json(updated);
            } else {
                const created = await prisma.testimonial.create({
                    data: rest
                });
                return NextResponse.json(created);
            }
        }

        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const type = searchParams.get('type');

        if (type === 'testimonial' && id) {
            await prisma.testimonial.delete({ where: { id } });
            return NextResponse.json({ success: true });
        }
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
