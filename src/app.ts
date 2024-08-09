import fastify from 'fastify';

const app = fastify({
  ignoreTrailingSlash: true,
});

export default app;
