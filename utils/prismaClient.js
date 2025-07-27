import { PrismaClient } from '../generated/prisma/index.js';

const globalForprisma = globalThis;

if (!globalForprisma.prisma){
  globalForprisma.prisma=new PrismaClient();

}

export const prisma = globalForprisma.prisma;