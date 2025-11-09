import proxyAddr from '@fastify/proxy-addr';
import fastify from 'fastify';
import { logger } from './common/logger';
import { TRUST_PROXY } from './config/env';

export const app = fastify({
  loggerInstance: logger,
  trustProxy: proxyAddr.compile(TRUST_PROXY),
  routerOptions: {
    ignoreTrailingSlash: true,
  },
});
