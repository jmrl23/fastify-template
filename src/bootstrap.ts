import { CORS_ORIGIN } from '@/config/env';
import fastifyCors from '@fastify/cors';
import fastifyEtag from '@fastify/etag';
import fastifyStatic from '@fastify/static';
import { routes } from '@/plugins/routes';
import { swagger } from '@/plugins/swagger';
import { fastifyPlugin } from 'fastify-plugin';
import path from 'node:path';

interface Options {}

export const bootstrap = fastifyPlugin<Options>(async function bootstrap(app) {
  await app.register(fastifyEtag);

  if (CORS_ORIGIN) {
    await app.register(fastifyCors, {
      origin: CORS_ORIGIN,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      credentials: true,
    });
  }

  if (process.env.NODE_ENV === 'development') {
    await app.register(swagger, {
      servers: [
        {
          url: `http://localhost:${process.env.PORT}`,
          description: 'Development server',
        },
      ],
    });
  }

  await app.register(routes, {
    location: path.resolve(__dirname, './modules'),
    onRegistered(routes) {
      for (const route of routes) {
        app.log.info(`loaded route (${route})`);
      }
    },
  });

  await app.register(fastifyStatic, {
    root: path.resolve(__dirname, '../public'),
    logLevel: 'silent',
  });
});
