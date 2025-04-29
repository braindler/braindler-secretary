import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

export default fp(async (server, opts) => {
  const prisma = new PrismaClient();
  await prisma.$connect();
  server.decorate('prisma', prisma);
});