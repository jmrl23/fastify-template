import * as colorette from 'colorette';
import path from 'node:path';
import fastifyPlugin from 'fastify-plugin';
import fastifyAutoload from '@fastify/autoload';
import fastifyCors from '@fastify/cors';
import fastifyMiddie from '@fastify/middie';
import fastifyStatic from '@fastify/static';
import logger from '../lib/utils/logger';
import swaggerPlugin from './swagger.plugin';
import morganMiddleware from '../middlewares/morgan.middleware';

export default fastifyPlugin(async function setupPlugin(app) {
  await app.register(fastifyCors, {
    origin: '*',
  });

  await app.register(fastifyStatic, {
    root: path.resolve(__dirname, '../../public'),
  });

  await app.register(swaggerPlugin);

  await app.register(fastifyAutoload, {
    dir: path.resolve(__dirname, '../routes'),
    matchFilter: (path) => {
      const name = path.replace(/\/?route\.(ts|js|cjs|mjs)$/, '').trim();
      const [firstChar, lastChar] = [
        name.charAt(0),
        name.charAt(name.length - 1),
      ];
      const isRouteFile =
        name === '' || (firstChar === '/' && lastChar === '.');

      if (isRouteFile) {
        logger.info(
          `Route %s {%s}`,
          colorette.yellow('Registered'),
          colorette.magentaBright(path.substring(1)),
        );
      }

      return isRouteFile;
    },
  });

  await app.register(fastifyMiddie);

  app.use(morganMiddleware);
});
