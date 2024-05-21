import './init';
import app from './app';
import setupPlugin from './plugins/setup.plugin';
import env from 'env-var';
import detectPort from 'detect-port';
import logger from './lib/utils/logger';

async function main() {
  await app.register(setupPlugin);

  const port = await detectPort(env.get('PORT').default(3001).asPortNumber());

  app.listen(
    {
      port,
    },
    function (_error, address) {
      logger.info(address);
    },
  );
}

void main();
