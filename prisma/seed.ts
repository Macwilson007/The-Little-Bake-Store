import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DIRECT_DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    // 1. Create Admin User
    const adminPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.upsert({
        where: { email: 'admin@littlebakestore.com' },
        update: {},
        create: {
            email: 'admin@littlebakestore.com',
            name: 'Store Admin',
            password: adminPassword,
            role: 'ADMIN',
        },
    });

    // Upsert Categories
    const categories = [
        { name: 'Cakes', slug: 'cakes', description: 'Beautifully crafted cakes for every occasion' },
        { name: 'Cupcakes', slug: 'cupcakes', description: 'Perfectly sized treats in amazing flavors' },
        { name: 'Desserts', slug: 'desserts', description: 'Individual dessert portions and parfaits' },
        { name: 'Pastries', slug: 'pastries', description: 'Flaky, buttery baked goods' },
        { name: 'Event Packages', slug: 'event-packages', description: 'Curated boxes for your special events' },
    ];

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: cat,
            create: cat,
        });
    }

    const cakesCat = await prisma.category.findUnique({ where: { slug: 'cakes' } });
    const cupcakesCat = await prisma.category.findUnique({ where: { slug: 'cupcakes' } });
    const eventsCat = await prisma.category.findUnique({ where: { slug: 'event-packages' } });
    const pastriesCat = await prisma.category.findUnique({ where: { slug: 'pastries' } });
    const dessertsCat = await prisma.category.findUnique({ where: { slug: 'desserts' } });

    // Upsert Products
    const products = [
        {
            name: 'Classic Chocolate Birthday Cake',
            slug: 'classic-chocolate-birthday-cake',
            price: 25000,
            originalPrice: 30000,
            description: 'Our signature Classic Chocolate Birthday Cake is every chocolate lover\'s dream. Moist, rich chocolate layers are generously filled and frosted with our velvety dark chocolate ganache.',
            shortDescription: 'Rich double chocolate layer cake with dark chocolate ganache.',
            ingredients: ['Belgian Chocolate', 'Farm-fresh Eggs', 'Premium Butter', 'Vanilla Extract', 'Unbleached Flour', 'Cocoa Powder', 'Heavy Cream'],
            image: '/images/cake_chocolate.png',
            images: ['/images/cake_chocolate.png'],
            badge: 'bestseller',
            categoryId: cakesCat?.id || '',
        },
        {
            name: 'Red Velvet Layer Cake',
            slug: 'red-velvet-layer-cake',
            price: 30000,
            originalPrice: 35000,
            description: 'A Southern classic perfected. Our Red Velvet Layer Cake features a mild chocolate flavor with a beautiful bright red crumb, layered and coated in our signature tangy-sweet cream cheese frosting.',
            shortDescription: 'Classic red velvet cake with smooth cream cheese frosting.',
            ingredients: ['Buttermilk', 'Cocoa Powder', 'Cream Cheese', 'Vanilla Extract', 'Premium Butter'],
            image: '/images/cake_red_velvet.png',
            images: ['/images/cake_red_velvet.png'],
            badge: 'popular',
            categoryId: cakesCat?.id || '',
        },
        {
            name: 'Vanilla Bean Cloud Cake',
            slug: 'vanilla-bean-cloud-cake',
            price: 22000,
            description: 'A light, airy, and incredibly moist vanilla sponge made with Madagascar vanilla beans, topped with a cloud-like whipped cream frosting.',
            shortDescription: 'Light and airy vanilla bean sponge with whipped cream.',
            ingredients: ['Madagascar Vanilla Bean', 'Cake Flour', 'Egg Whites', 'Heavy Cream', 'Organic Sugar'],
            image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80',
            images: ['https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80'],
            badge: 'new',
            categoryId: cakesCat?.id || '',
        },
        {
            name: 'Strawberries & Cream Cupcakes',
            slug: 'strawberries-cream-cupcakes',
            price: 12000,
            description: 'Light and fluffy vanilla bean cupcakes topped with a generous swirl of buttercream made with real crushed strawberries.',
            shortDescription: 'Box of 12 vanilla cupcakes with fresh strawberry buttercream.',
            ingredients: ['Flour', 'Sugar', 'Butter', 'Eggs', 'Vanilla Bean', 'Fresh Strawberries'],
            image: '/images/cupcake_strawberry.png',
            images: ['/images/cupcake_strawberry.png'],
            categoryId: cupcakesCat?.id || '',
        },
        {
            name: 'Salted Caramel Cupcakes',
            slug: 'salted-caramel-cupcakes',
            price: 15000,
            description: 'Rich dark chocolate cupcakes with a gooey salted caramel center, topped with caramel buttercream and a drizzle of sea salt caramel.',
            shortDescription: 'Box of 12 chocolate caramel cupcakes with sea salt.',
            ingredients: ['Dark Chocolate', 'Sea Salt', 'Caramel', 'Unsalted Butter', 'Cocoa Powder'],
            image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80',
            images: ['https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80'],
            badge: 'popular',
            categoryId: cupcakesCat?.id || '',
        },
        {
            name: 'Artisan Croissant Box',
            slug: 'artisan-croissant-box',
            price: 18000,
            description: 'A box of 6 oversized, flaky, buttery croissants made with 100% French butter. Perfectly laminated for maximum layers.',
            shortDescription: 'Box of 6 handmade buttery French croissants.',
            ingredients: ['French Butter', 'Bread Flour', 'Yeast', 'Whole Milk', 'Sea Salt'],
            image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
            images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80'],
            categoryId: pastriesCat?.id || '',
        },
        {
            name: 'Dark Chocolate Ganache Brownies',
            slug: 'dark-chocolate-brownies',
            price: 14000,
            description: 'Fudgy, dense brownies made with 70% dark Belgian chocolate and topped with a smooth chocolate ganache layer.',
            shortDescription: 'Box of 9 rich dark chocolate brownies.',
            ingredients: ['Belgian Dark Chocolate', 'Cocoa Powder', 'Butter', 'Eggs', 'Brown Sugar'],
            image: 'https://images.unsplash.com/photo-1461008102162-66322b93196c?auto=format&fit=crop&w=800&q=80',
            images: ['https://images.unsplash.com/photo-1461008102162-66322b93196c?auto=format&fit=crop&w=800&q=80'],
            badge: 'bestseller',
            categoryId: dessertsCat?.id || '',
        },
        {
            name: 'Party Dessert Box',
            slug: 'party-dessert-box',
            price: 35000,
            originalPrice: 42000,
            description: 'Take the stress out of hosting with our Party Dessert Box. Includes cupcakes, brownies, dessert cups, and cake pops.',
            shortDescription: 'A curated mix of our best mini desserts for any gathering.',
            ingredients: ['Assorted Ingredients'],
            image: '/images/dessert_box.png',
            images: ['/images/dessert_box.png'],
            badge: 'sale',
            categoryId: eventsCat?.id || '',
        },
    ];

    for (const prod of products) {
        await prisma.product.upsert({
            where: { slug: prod.slug },
            update: prod,
            create: prod,
        });
    }

    // Seed SiteSettings
    await prisma.siteSettings.upsert({
        where: { id: 'standard' },
        update: {},
        create: {
            id: 'standard',
            heroTitle: 'Artisan Bakes, Made with Love',
            heroSubtitle: 'Handcrafted cakes, cupcakes & pastries made from premium ingredients.',
            contactEmail: 'orders@littlebakestore.com',
            contactPhone: '+234 800 000 0000',
            contactAddress: 'Abuja, Nigeria',
            instagramUrl: 'https://instagram.com/littlebakestore',
        },
    });

    // Seed Testimonials
    const seedTestimonials = [
        {
            author: 'Chidinma O.',
            role: 'Birthday Customer',
            content: 'The chocolate cake was absolutely divine! It was the highlight of my birthday party. Moist, not too sweet, and beautifully decorated.',
            rating: 5,
            avatar: '👩🏾',
        },
        {
            author: 'Tunde A.',
            role: 'Corporate Client',
            content: 'Ordered the event package for our end-of-year meeting. The presentation was top-notch and everyone loved the dessert cups!',
            rating: 5,
            avatar: '👨🏾',
        },
        {
            author: 'Aisha I.',
            role: 'Regular Customer',
            content: 'Their red velvet cupcakes are my weekly guilty pleasure. Always fresh and the cream cheese frosting is perfect.',
            rating: 4,
            avatar: '🧕🏾',
        },
    ];

    for (const t of seedTestimonials) {
        await prisma.testimonial.upsert({
            where: { id: t.content.substring(0, 10) }, // Use substring as a quick unique key for seeding
            update: t,
            create: { ...t, id: t.content.substring(0, 10) }
        });
    }

    console.log('Seed completed successfully');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
