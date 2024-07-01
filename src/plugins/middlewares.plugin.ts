import fastifyMiddie from '@fastify/middie';
import * as c from 'colorette';
import fastifyPlugin from 'fastify-plugin';
import morgan from 'morgan';
import logger from '../lib/util/logger';

export default fastifyPlugin(
  async function middlewaresPlugin(app) {
    await app.register(fastifyMiddie, { prefix: '/' });

    app.use(
      morgan(
        ':remote-addr :method :url :status :res[content-length] - :response-time ms',
        {
          stream: {
            write(message) {
              logger.http(`${c.bold('morgan')} ${message.trim()}`);
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
