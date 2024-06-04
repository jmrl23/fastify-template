import './init';
import { SERVER_HOST, PORT } from './lib/constant/environment';
import app from './app';
import detectPort from 'detect-port';
import * as c from 'colorette';
import logger from './lib/util/logger';

async function main() {
  const host = SERVER_HOST;
  const port = await detectPort(PORT);

  app.listen(
    {
      host,
      port,
    },
    function (error) {
      if (error) return logger.error(error.message);

      logger.info(`Running on port ${c.bold(c.yellow(port))}`);
    },
  );
}

void main();
