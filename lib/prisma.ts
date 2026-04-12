import { PrismaClient } from '../prisma/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// בדיקה שה-URL אכן נטען (יופיע בטרמינל שלך)
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL missing from .env file");
}

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// בגרסה 7, אנחנו חייבים להעביר את ה-adapter בבנאי
export const prisma = 
  globalForPrisma.prisma || 
  new PrismaClient({ 
    adapter: adapter 
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;