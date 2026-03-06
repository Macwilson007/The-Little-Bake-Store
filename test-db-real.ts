import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";

const prismaClientSingleton = () => {
    console.log("Connecting with DIRECT_DATABASE_URL:", process.env.DIRECT_DATABASE_URL);
    const pool = new Pool({ connectionString: process.env.DIRECT_DATABASE_URL });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
};

async function test() {
    const prisma = prismaClientSingleton();
    try {
        const userCount = await prisma.user.count();
        const productCount = await prisma.product.count();
        const categoryCount = await prisma.category.count();
        console.log("Connection successful!");
        console.log("User count:", userCount);
        console.log("Product count:", productCount);
        console.log("Category count:", categoryCount);
    } catch (e: any) {
        console.error("Connection failed:", e.message || e);
    } finally {
        await prisma.$disconnect();
    }
}

test();
