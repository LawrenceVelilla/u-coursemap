import { PrismaClient } from './generated/prisma';
import dotenv from 'dotenv';


dotenv.config({ path: '.env' });

export const prisma = new PrismaClient();

