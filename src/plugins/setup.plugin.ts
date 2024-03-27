import { yellow } from 'colorette';
import { join } from 'node:path';
import fastifyPlugin from 'fastify-plugin';
import fastifyAutoload from '@fastify/autoload';
import fastifyCors from '@fastify/cors';
import fastifyMiddie from '@fastify/middie';
import fastifyStatic from '@fastify/static';
import logger from '../lib/utils/logger';
import morganMiddleware from '../middlewares/morgan.middleware';

export default fastifyPlugin(async function setupPlugin(app) {
  await app.register(fastifyMiddie);

  app.use(morganMiddleware);

  await app.register(fastifyCors, {
    origin: '*',
  });

  await app.register(fastifyStatic, {
    root: join(__dirname, '../../public'),
  });

  await app.register(fastifyAutoload, {
    dir: join(__dirname, '../routes'),
    matchFilter: (path) => {
      const isMatched = /\.?route\.(ts|js|cjs|mjs)$/.test(path);
      if (!isMatched) return false;
      logger.info(`Route ${yellow('Register')} {%s}`, path.substring(1));
      return true;
    },
  });
});
