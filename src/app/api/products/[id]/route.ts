import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const product = await prisma.product.findUnique({
            where: { id: params.id },
            include: { category: true },
        });
        if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const data = await request.json();
        const product = await prisma.product.update({
            where: { id: params.id },
            data: {
                name: data.name,
                slug: data.slug,
                description: data.description,
                shortDescription: data.shortDescription,
                price: parseFloat(data.price),
                originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : null,
                categoryId: data.categoryId,
                image: data.image,
                images: data.images || [],
                badge: data.badge,
                inStock: data.inStock,
                flavor: data.flavor,
                ingredients: data.ingredients || [],
                occasions: data.occasions || [],
                dietTypes: data.dietTypes || [],
            },
        });
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.product.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: 'Product deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
