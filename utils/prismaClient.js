import { PrismaClient } from '@prisma/client';

const globalForprisma = globalThis;

let prisma;

if (!globalForprisma.prisma){
  globalForprisma.prisma=new PrismaClient();

}
prisma = globalForprisma.prisma;

export default prisma;