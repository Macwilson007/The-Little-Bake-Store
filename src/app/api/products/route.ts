import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all products
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

// POST new product
export async function POST(request: Request) {
    try {
        const data = await request.json();
        const product = await prisma.product.create({
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
                inStock: data.inStock ?? true,
                flavor: data.flavor,
                ingredients: data.ingredients || [],
                occasions: data.occasions || [],
                dietTypes: data.dietTypes || [],
            },
        });
        return NextResponse.json(product);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
