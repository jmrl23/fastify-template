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
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  serializers:
    process.env.NODE_ENV === 'production'
      ? productionSerializer
      : developmentSerializer,
};

const loggerOptions: LoggerOptions =
  process.env.NODE_ENV === 'development'
    ? {
        ...baseLoggerOptions,
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            ignore: 'pid,hostname',
            translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
          },
        },
      }
    : baseLoggerOptions;

export const logger = pino(loggerOptions);
