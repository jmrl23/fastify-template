import type { FastifyRequest } from 'fastify';
import type { FromSchema } from 'json-schema-to-ts';
import AppService from '../services/app.service';
import { asJsonSchema, asRoute } from '../lib/utils/fastify/typings';

// export const prefix = '/';

export default asRoute(async function appRoute(app) {
  const appService = await AppService.getInstance();

  const messageReverseBodySchema = asJsonSchema({
    type: 'object',
    properties: {
      message: {
        type: 'string',
        minLength: 1,
      },
    },
    required: ['message'],
    additionalProperties: false,
  } as const);

  app.route({
    method: 'POST',
    url: '/message/reverse',
    schema: {
      description: 'Reverse message value',
      tags: ['example'],
      security: [],
      body: messageReverseBodySchema,
    },
    async handler(
      request: FastifyRequest<{
        Body: FromSchema<typeof messageReverseBodySchema>;
      }>,
    ) {
      const message = request.body.message;
      const reversedText = await appService.getReversedText(message);

      return {
        message: reversedText,
      };
    },
  });
});
