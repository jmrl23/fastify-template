import { PORT } from '@/common/env';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyPlugin from 'fastify-plugin';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { OpenAPIV3_1 } from 'openapi-types';

interface Options {
  servers?: OpenAPIV3_1.ServerObject[];
}

/**
 * A Fastify plugin that configures and registers Swagger (OpenAPI) documentation.
 * It integrates `@fastify/swagger` for specification generation and `@fastify/swagger-ui`
 * for the interactive documentation interface.
 *
 * The plugin automatically derives the API version from `package.json`.
 * Additionally, it updates the `servers` list in the OpenAPI document to include
 * accessible network addresses (localhost and LAN IPs) once the server starts listening.
 *
 * @param app The Fastify instance.
 * @param options The plugin options, allowing custom server definitions.
 */
export const docs = fastifyPlugin<Options>(
  async function (app, options) {
    const PACKAGE_JSON_PATH = path.resolve(__dirname, '../../package.json');
    const config = fs.existsSync(PACKAGE_JSON_PATH)
      ? JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'))
      : { version: '1.0.0' };

    const servers: OpenAPIV3_1.ServerObject[] = [...(options.servers || [])];

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
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
      },
    });

    const routePrefix = '/docs';
    await app.register(fastifySwaggerUi, {
      routePrefix,
      logLevel: 'silent',
    });

    app.addHook('onListen', async function () {
      const swagger = app.swagger() as OpenAPIV3_1.Document;
      const addresses = app.addresses().map(({ address }) => address);
      const port = PORT;

      app.log.info(`API documentation available at (${routePrefix})`);

      if (!addresses.includes('0.0.0.0')) {
        for (const address of addresses) {
          swagger.servers?.push({ url: `http://${address}:${port}` });
        }
        return;
      }

      swagger.servers?.push({ url: `http://localhost:${port}` });

      const networkInterfaces = os.networkInterfaces();
      for (const name in networkInterfaces) {
        const networkInterface = networkInterfaces[name];
        if (!networkInterface) continue;
        for (const network of networkInterface) {
          if (network.family === 'IPv4') {
            swagger.servers?.push({
              url: `http://${network.address}:${port}`,
            });
          }
        }
      }
    });
  },
  { name: 'fastify-template-docs' },
);
