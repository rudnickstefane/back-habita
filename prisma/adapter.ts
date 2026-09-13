import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

export const prismaAdapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
