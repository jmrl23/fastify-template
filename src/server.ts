import { detect } from 'detect-port';
import fastify from 'fastify';
import { HttpError, NotFound } from 'http-errors';
import { bootstrap } from './bootstrap';
import { getEnv } from './packages/env-var/get-env';
import { getLogger } from './packages/pino/get-logger';

const PORT = getEnv('PORT').default(3001).asPortNumber();

const TRUST_PROXY = getEnv('TRUST_PROXY').default('loopback').asArray(',');

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
  loggerInstance: getLogger(),
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
