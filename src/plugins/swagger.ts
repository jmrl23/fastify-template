import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyPlugin from 'fastify-plugin';
import fs from 'node:fs';
import path from 'node:path';
import { OpenAPIV3_1 } from 'openapi-types';

interface Options {
  servers?: OpenAPIV3_1.ServerObject[];
}

export const swagger = fastifyPlugin<Options>(async function (app, options) {
  const PACKAGE_JSON_PATH = path.resolve(__dirname, '../../package.json');
  const config = fs.existsSync(PACKAGE_JSON_PATH)
    ? JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'))
    : { version: '1.0.0' };

  const servers: OpenAPIV3_1.ServerObject[] = [];

  if (options.servers) {
    servers.push(...options.servers);
  }

  await app.register(fastifySwagger, {
    prefix: '/docs',
    logLevel: 'silent',
    openapi: {
      openapi: '3.1.0',
      info: {
        title: 'Rest API',
        version: config.version,
      },
      servers,
      components: {
        // securitySchemes: {
        //   bearerAuth: {
        //     type: 'http',
        //     scheme: 'bearer',
        //     bearerFormat: 'JWT',
        //   },
        // },
      },
    },
  });

  const routePrefix = '/docs';
  await app.register(fastifySwaggerUi, {
    routePrefix,
    logLevel: 'silent',
  });

  app.ready().then(() => {
    app.log.info(`swagger documentation available at (${routePrefix})`);
  });
});
