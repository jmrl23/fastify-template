import { AppService } from '../services/app.service';
import { type FastifyInstance } from 'fastify';

export default async function (app: FastifyInstance) {
  const appService = await AppService.getInstance();

  app.route({
    method: 'GET',
    url: '/message',
    async handler() {
      const message = await appService.getMessage();

      return {
        message,
      };
    },
  });
}
