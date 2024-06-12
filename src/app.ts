import fastify from 'fastify';
import { NotFound } from 'http-errors';
import setupPlugin from './plugins/setup.plugin';
import logger from './lib/util/logger';

const app = fastify();

app.register(setupPlugin);

app.setNotFoundHandler((request) => {
  throw new NotFound(`Cannot ${request.method} ${request.url}`);
});

app.setErrorHandler(async function (error, request) {
  if (!error.statusCode || error.statusCode > 399) {
    console.error(error);
  }
  logger.error(error.message);
  return error;
});

export default app;
