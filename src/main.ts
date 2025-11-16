import { detect } from 'detect-port';
import { OpenAPIV3_1 } from 'openapi-types';
import { app } from './app';
import { bootstrap } from './bootstrap';
import { PORT } from '@/config/env';

async function main() {
  const host = '0.0.0.0';
  const port = await detect(PORT);

  await app.register(bootstrap);

  app.listen({
    host,
    port,
    listenTextResolver: (address) => {
      if (process.env.NODE_ENV === 'development') {
        const swagger = app.swagger() as OpenAPIV3_1.Document;
        swagger.servers?.push({
          url: address,
          description: 'Development server',
        });
      }
      return `server listening at ${address}`;
    },
  });
}

void main();
