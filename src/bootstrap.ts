import fastifyCors from '@fastify/cors';
import fastifyEtag from '@fastify/etag';
import fastifyMiddie from '@fastify/middie';
import fastifyStatic from '@fastify/static';
import { FastifyInstance } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';
import { NotFound } from 'http-errors';
import path from 'node:path';
import { logger } from './common/logger';
import { CORS_ORIGIN } from './config/env';
import { routesAutoloadPlugin } from './plugins/routesAutoload';
import { swaggerPlugin } from './plugins/swagger';

export const bootstrap = fastifyPlugin(async function (app) {
  await app.register(fastifyEtag);

  await app.register(fastifyMiddie);

  await app.register(fastifyCors, {
    origin: CORS_ORIGIN,
  });

  await app.register(swaggerPlugin);

  await app.register(routesAutoloadPlugin, {
    dirPath: path.resolve(__dirname, './modules'),
    callback(routes) {
      for (const route of routes) {
        logger.info(`registered route {${route}}`);
      }
    },
  });

  await app.register(fastifyStatic, {
    root: path.resolve(__dirname, '../public'),
  });

  await postConfigurations(app);
});

async function postConfigurations(app: FastifyInstance) {
  app.setNotFoundHandler(async function notFoundHandler(request) {
    throw new NotFound(`Cannot ${request.method} ${request.url}`);
  });

  app.setErrorHandler(async function errorHandler(error) {
    if (!error.statusCode || error.statusCode > 499) {
      logger.error(error.stack ?? error.message);
    }
    return error;
  });
}
