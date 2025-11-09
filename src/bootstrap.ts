import fastifyCors from '@fastify/cors';
import fastifyEtag from '@fastify/etag';
import fastifyStatic from '@fastify/static';
import { FastifyPluginAsync } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';
import path from 'node:path';
import { logger } from './common/logger';
import { CORS_ORIGIN } from './config/env';
import { routesAutoload } from './plugins/routesAutoload';
import { swagger } from './plugins/swagger';

interface Options {}

export const bootstrap: FastifyPluginAsync<Options> = fastifyPlugin(
  async function bootstrap(app) {
    await app.register(fastifyEtag);

    if (CORS_ORIGIN) {
      await app.register(fastifyCors, {
        origin: CORS_ORIGIN,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        credentials: true,
      });
    }

    if (process.env.NODE_ENV === 'development') {
      await app.register(swagger);
    }

    await app.register(routesAutoload, {
      dirPath: path.resolve(__dirname, './modules'),
      callback(routes) {
        for (const route of routes) {
          logger.info(`loaded route (${route})`);
        }
      },
    });

    await app.register(fastifyStatic, {
      root: path.resolve(__dirname, '../public'),
    });
  },
);
