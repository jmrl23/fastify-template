import { app } from '@/app';
import { bootstrap } from '@/bootstrap';
import { env } from '@/config/env';
import { init } from '@/init';
import { detect } from 'detect-port';
import { OpenAPIV3_1 } from 'openapi-types';

async function main() {
  await init();

  const host = '0.0.0.0';
  const port = await detect(env.PORT);

  await app.register(bootstrap);

  app.listen({
    host,
    port,
    listenTextResolver: (address) => {
      if (env.NODE_ENV === 'development') {
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
