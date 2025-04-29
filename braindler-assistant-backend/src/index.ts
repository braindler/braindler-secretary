import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import prismaPlugin from './plugins/prisma';
import scriptsRoutes from './routes/scripts';

const server = Fastify();

server.register(swagger, {
  routePrefix: '/docs',
  swagger: {
    info: { title: 'Braindler Assistant API', version: '1.0.0' }
  },
  exposeRoute: true
});

server.register(prismaPlugin);
server.register(scriptsRoutes, { prefix: '/scripts' });

server.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});