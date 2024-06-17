import fastify from 'fastify';
import { NotFound } from 'http-errors';
import setupPlugin from './plugins/setup.plugin';
import logger from './lib/util/logger';

const app = fastify();

app.register(setupPlugin, { prefix: '/' });

app.setNotFoundHandler(async function notFoundHandler(request) {
  throw new NotFound(`Cannot ${request.method} ${request.url}`);
});

app.setErrorHandler(async function errorHandler(error) {
  if (!error.statusCode || error.statusCode > 499) {
    logger.error(error.stack);
  }
  return error;
});

export default app;
