import type { FastifyInstance, FastifyRequest } from 'fastify';
import AppService from '../services/app.service';

export const autoPrefix = '/';

export default async function appRoute(app: FastifyInstance) {
  const appService = await AppService.getInstance();

  app.route({
    method: 'POST',
    url: '/message/reverse',
    schema: {
      description: 'Reverse message value',
      tags: ['example'],
      security: [],
      body: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            default: 'Hello, World!',
          },
        },
        required: ['message'],
      },
    },
    async handler(
      request: FastifyRequest<{
        Body: {
          message: string;
        };
      }>,
    ) {
      const message = request.body.message;
      const reversedText = await appService.getReversedText(message);

      return {
        message: reversedText,
      };
    },
  });
}
