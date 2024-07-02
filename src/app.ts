import fastify from 'fastify';
import { NotFound } from 'http-errors';
import logger from './lib/util/logger';
import setup from './plugins/setup';

const app = fastify();

app.register(setup, { prefix: '/' });

app.setNotFoundHandler(async function notFoundHandler(request) {
  throw new NotFound(`Cannot ${request.method} ${request.url}`);
});

app.setErrorHandler(async function errorHandler(error) {
  if (!error.statusCode || error.statusCode > 499) {
    logger.error(error.stack ?? error.message);
  }
  return error;
});

export default app;
