import type { FastifyInstance } from 'fastify';
import AppService from '../services/app.service';

export const autoPrefix = '/test';

export default async function appRoute(app: FastifyInstance) {
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
