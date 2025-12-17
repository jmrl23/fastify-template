import { TRUST_PROXY } from '@/common/env';
import { logger } from '@/common/logger';
import fastify from 'fastify';
import { HttpError, NotFound } from 'http-errors';

export const server = fastify({
  loggerInstance: logger,
  trustProxy: TRUST_PROXY,
  routerOptions: {
    ignoreTrailingSlash: true,
  },
});

server.setNotFoundHandler(async function notFoundHandler(request) {
  throw new NotFound(`Cannot ${request.method} ${request.url}`);
});

server.setErrorHandler(async function errorHandler(error) {
  const isHttpError = error instanceof HttpError;
  if (isHttpError && error.statusCode > 499) {
    this.log.error(error.stack ?? error.message);
  }
  return error;
});
