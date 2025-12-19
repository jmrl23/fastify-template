import { bootstrap } from '@/bootstrap';
import { PORT, TRUST_PROXY } from '@/common/env';
import { logger } from '@/common/logger';
import { detect } from 'detect-port';
import fastify from 'fastify';
import { HttpError, NotFound } from 'http-errors';

export async function run() {
  const host = '0.0.0.0';
  const port = await detect(PORT);

  await app.register(bootstrap);

  app.listen({
    host,
    port,
    listenTextResolver(address) {
      return `Listening at ${address}`;
    },
  });
}

export const app = fastify({
  loggerInstance: logger,
  trustProxy: TRUST_PROXY,
  routerOptions: {
    ignoreTrailingSlash: true,
  },
});

app.setNotFoundHandler(async function notFoundHandler(request) {
  throw new NotFound(`Cannot ${request.method} ${request.url}`);
});

app.setErrorHandler(async function errorHandler(error) {
  const isHttpError = error instanceof HttpError;
  if (isHttpError && error.statusCode > 499) {
    this.log.error(error.stack ?? error.message);
  }
  return error;
});
