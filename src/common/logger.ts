import { NODE_ENV } from '@/common/env';
import { FastifyReply, FastifyRequest } from 'fastify';
import pino, { LoggerOptions } from 'pino';

const developmentSerializer = {
  req(request: FastifyRequest) {
    return {
      method: request.method,
      url: request.url,
      query: request.query,
      params: request.params,
    };
  },
  res(response: FastifyReply) {
    return {
      statusCode: response.statusCode,
      headers:
        typeof response.getHeaders === 'function' ? response.getHeaders() : {},
    };
  },
};

const productionSerializer = {
  req(request: FastifyRequest) {
    return {
      method: request.method,
      url: request.url,
    };
  },
  res(response: FastifyReply) {
    return {
      statusCode: response.statusCode,
      headers:
        typeof response.getHeaders === 'function' ? response.getHeaders() : {},
    };
  },
};

const baseLoggerOptions: LoggerOptions = {
  level: NODE_ENV === 'production' ? 'info' : 'debug',
  serializers:
    NODE_ENV === 'production' ? productionSerializer : developmentSerializer,
};

const loggerOptions = baseLoggerOptions;

if (NODE_ENV === 'development') {
  try {
    require.resolve('pino-pretty');
    loggerOptions.transport = {
      target: 'pino-pretty',
      options: {
        colorize: true,
        ignore: 'pid,hostname',
        translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
      },
    };
  } catch {}
}

export const logger = pino(loggerOptions);
