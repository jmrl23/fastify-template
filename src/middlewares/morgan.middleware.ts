import { gray } from 'colorette';
import { logger } from '../libs/utils/logger';
import type { NextHandleFunction } from '@fastify/middie';
import morgan from 'morgan';

export default (function morganMiddleware(request, response, next) {
  const format =
    ':remote-addr :method :url :status :res[content-length] - :response-time ms';

  return morgan(format, {
    stream: {
      write(message) {
        logger.http(gray(message.trim()));
      },
    },
  })(request, response, next);
} satisfies NextHandleFunction);
