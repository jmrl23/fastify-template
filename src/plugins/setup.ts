import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import * as c from 'colorette';
import fastifyPlugin from 'fastify-plugin';
import path from 'node:path';
import logger from '../lib/util/logger';
import middleware from './middleware';
import routes from './routes';
import swagger from './swagger';

export default fastifyPlugin(
  async function setup(app) {
    await app.register(middleware, { prefix: '/' });

    await app.register(fastifyCors, {
      origin: '*',
      prefix: '/',
    });

    await app.register(swagger, { prefix: '/' });

    await app.register(routes, {
      prefix: '/',
      dirPath: path.resolve(__dirname, '../routes'),
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
  { name: 'setup' },
);
