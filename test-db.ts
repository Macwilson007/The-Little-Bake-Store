import { PrismaClient } from '@prisma/client';
import "dotenv/config";

async function test() {
    console.log("Testing with DIRECT_DATABASE_URL:", process.env.DATABASE_URL);
    const prisma = new PrismaClient();

    try {
        const userCount = await prisma.user.count();
        console.log("User count (direct):", userCount);
    } catch (e: any) {
        console.error("Direct failed:", e.message || e);
    } finally {
        await prisma.$disconnect();
    }
}

test();
