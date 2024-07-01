import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import * as c from 'colorette';
import fastifyPlugin from 'fastify-plugin';
import path from 'node:path';
import logger from '../lib/util/logger';
import middlewaresPlugin from './middlewares.plugin';
import routesPlugin from './routes.plugin';
import swaggerPlugin from './swagger.plugin';

export default fastifyPlugin(
  async function setupPlugin(app) {
    await app.register(middlewaresPlugin, { prefix: '/' });

    await app.register(fastifyCors, {
      origin: '*',
      prefix: '/',
    });

    await app.register(swaggerPlugin, { prefix: '/' });

    const routesDir = path.resolve(__dirname, '../routes');
    await app.register(routesPlugin, {
      prefix: '/',
      dirPath: routesDir,
      callback(routeFiles) {
        for (const filePath of routeFiles) {
          logger.info(`${c.bold('registered route')} ${filePath}`);
        }
      },
    });

    await app.register(fastifyStatic, {
      root: path.resolve(__dirname, '../../public'),
      prefix: '/',
    });
  },
  {
    name: 'setupPlugin',
  },
);
