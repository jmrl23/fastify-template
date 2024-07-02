import fastify from 'fastify';
import setup from './plugins/setup';

const app = fastify();

app.register(setup, { prefix: '/' });

export default app;
