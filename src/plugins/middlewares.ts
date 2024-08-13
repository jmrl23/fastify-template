import fastifyMiddie from '@fastify/middie';
import fastifyPlugin from 'fastify-plugin';

export default fastifyPlugin(async function (app) {
  await app.register(fastifyMiddie, { prefix: '/' });

  // middlewares here
});
