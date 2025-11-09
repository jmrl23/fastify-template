import { FastifyInstance } from 'fastify';

interface RouteFunction {
  (router: FastifyInstance): Promise<void>;
}

export function asRoute(fn: RouteFunction): RouteFunction {
  return fn;
}
