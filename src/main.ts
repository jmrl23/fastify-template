import { app } from '@/app';
import { bootstrap } from '@/bootstrap';
import { env } from '@/config/env';
import { init } from '@/init';
import { detect } from 'detect-port';

async function main() {
  await init();

  const host = '0.0.0.0';
  const port = await detect(env.PORT);

  await app.register(bootstrap);

  app.listen({
    host,
    port,
    listenTextResolver(address) {
      return `listening at ${address}`;
    },
  });
}

void main();
