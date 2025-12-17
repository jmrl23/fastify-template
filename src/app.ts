import { bootstrap } from '@/bootstrap';
import { PORT } from '@/common/env';
import { server } from '@/server';
import { detect } from 'detect-port';

export async function app() {
  const host = '0.0.0.0';
  const port = await detect(PORT);

  await server.register(bootstrap);

  server.listen({
    host,
    port,
    listenTextResolver(address) {
      return `listening at ${address}`;
    },
  });
}
