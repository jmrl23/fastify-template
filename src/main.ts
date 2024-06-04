import './init';
import { SERVER_HOSTNAME, PORT } from './lib/constant/environment';
import app from './app';
import detectPort from 'detect-port';
import logger from './lib/util/logger';

async function main() {
  const host = SERVER_HOSTNAME;
  const port = await detectPort(PORT);

  app.listen(
    {
      host,
      port,
    },
    function (error, address) {
      if (error) return logger.error(error.message);

      logger.info(address);
    },
  );
}

void main();
