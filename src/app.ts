import fastify from 'fastify';
import { NotFound } from 'http-errors';
import setupPlugin from './plugins/setup.plugin';

const app = fastify();

app.register(setupPlugin);

app.setNotFoundHandler((request) => {
  throw new NotFound(`Cannot ${request.method} ${request.url}`);
});

export default app;
