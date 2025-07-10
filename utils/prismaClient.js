import { Prisma } from "@prisma/client";

const globalForPrisma = globalThis;

let prisma;

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new Prisma();
}

prisma = globalForPrisma.prisma;

export default prisma;
