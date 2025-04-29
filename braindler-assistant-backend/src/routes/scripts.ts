import { FastifyPluginAsync } from 'fastify';

const scriptsRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', async () => {
    return server.prisma.aicsScript.findMany();
  });

  server.get('/:id', async (request) => {
    const { id } = request.params as { id: string };
    return server.prisma.aicsScript.findUnique({ where: { id: Number(id) } });
  });

  server.post('/', async (request) => {
    const { name, jsonData } = request.body as { name: string, jsonData: any };
    return server.prisma.aicsScript.create({ data: { name, jsonData } });
  });

  server.put('/:id', async (request) => {
    const { id } = request.params as { id: string };
    const { name, jsonData } = request.body as { name: string, jsonData: any };
    return server.prisma.aicsScript.update({ where: { id: Number(id) }, data: { name, jsonData } });
  });

  server.delete('/:id', async (request) => {
    const { id } = request.params as { id: string };
    await server.prisma.aicsScript.delete({ where: { id: Number(id) } });
    return { success: true };
  });
};

export default scriptsRoutes;