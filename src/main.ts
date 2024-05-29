import './init';
import { PORT } from './lib/constants/environment';
import app from './app';
import detectPort from 'detect-port';
import logger from './lib/utils/logger';

async function main() {
  const port = await detectPort(PORT);

  app.listen({ port }, function (_error, address) {
    logger.info(address);
  });
}

void main();
