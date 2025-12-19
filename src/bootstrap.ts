import { CORS_ORIGIN, SWAGGER_SERVERS } from '@/common/env';
import { docs } from '@/plugins/docs';
import { routes } from '@/plugins/routes';
import fastifyCors from '@fastify/cors';
import fastifyEtag from '@fastify/etag';
import fastifyStatic from '@fastify/static';
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

  await app.register(docs, {
    servers: SWAGGER_SERVERS?.map((url) => ({ url })),
  });

  await app.register(routes, {
    location: path.resolve(__dirname, './modules'),
    onRegister(routes) {
      for (const route of routes) {
        app.log.info(`Loaded route (${route})`);
      }
    },
  });

  await app.register(fastifyStatic, {
    root: path.resolve(__dirname, '../public'),
    logLevel: 'silent',
  });
});
