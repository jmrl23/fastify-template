import * as colorette from 'colorette';
import path from 'node:path';
import fastifyPlugin from 'fastify-plugin';
import fastifyCors from '@fastify/cors';
import fastifyMiddie from '@fastify/middie';
import fastifyStatic from '@fastify/static';
import logger from '../lib/util/logger';
import swaggerPlugin from './swagger.plugin';
import routesPlugin from './routes.plugin';
import morganMiddleware from '../middlewares/morgan.middleware';

export default fastifyPlugin(async function setupPlugin(app) {
  await app.register(fastifyCors, {
    origin: '*',
  });

  await app.register(fastifyStatic, {
    root: path.resolve(__dirname, '../../public'),
  });

  await app.register(swaggerPlugin);

  const routesDir = path.resolve(__dirname, '../routes');
  await app.register(routesPlugin, {
    dirPath: path.resolve(__dirname, '../routes'),
    callback(routeFiles) {
      for (const filePath of routeFiles) {
        const file = filePath
          .replace(/[\\\/]/g, '/')
          .substring(routesDir.length + 1);
        logger.info(
          `Route %s {%s}`,
          colorette.yellow('Registered'),
          colorette.magentaBright(file),
        );
      }
    },
  });

  await app.register(fastifyMiddie);

  app.use(morganMiddleware);
});
