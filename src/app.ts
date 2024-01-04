import fastify from 'fastify';
import { NotFound } from 'http-errors';

const app = fastify();

app.setNotFoundHandler((request) => {
  throw new NotFound(`Cannot ${request.method} ${request.url}`);
});

export default app;
