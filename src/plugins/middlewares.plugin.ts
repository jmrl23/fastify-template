import fastifyMiddie from '@fastify/middie';
import fastifyPlugin from 'fastify-plugin';
import morgan from 'morgan';
import logger from '../lib/util/logger';
import * as colorette from 'colorette';

export default fastifyPlugin(
  async function middlewaresPlugin(app) {
    await app.register(fastifyMiddie, { prefix: '/' });

    app.use(
      morgan(
        ':remote-addr :method :url :status :res[content-length] - :response-time ms',
        {
          stream: {
            write(message) {
              logger.http(colorette.gray(message.trim()));
            },
          },
        },
      ),
    );
  },
  {
    name: 'middlewaresPlugin',
  },
);
