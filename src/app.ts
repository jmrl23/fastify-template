import { logger } from '@/common/logger';
import { env } from '@/config/env';
import fastify from 'fastify';
import { HttpError, NotFound } from 'http-errors';

export const app = fastify({
  loggerInstance: logger,
  trustProxy: env.TRUST_PROXY,
  routerOptions: {
    ignoreTrailingSlash: true,
  },
});

app.setNotFoundHandler(async function notFoundHandler(request) {
  throw new NotFound(`Cannot ${request.method} ${request.url}`);
});

app.setErrorHandler(async function errorHandler(error) {
  const isHttpError = error instanceof HttpError;
  if (isHttpError && (!error.statusCode || error.statusCode > 499)) {
    logger.error(error.stack ?? error.message);
  }
  return error;
});
