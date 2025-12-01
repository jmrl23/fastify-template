import { env } from '@/config/env';
import dotenvx from '@dotenvx/dotenvx';
import { glob } from 'glob';
import fs from 'node:fs';
import path from 'node:path';

export async function init() {
  if (env.NODE_ENV === undefined) {
    process.env.NODE_ENV = 'development';
  }

  const ENV_PATHS = await glob(
    [
      `.env.${env.NODE_ENV}.local`,
      `.env.${env.NODE_ENV}`,
      '.env.local',
      '.env',
    ].map((file) => path.resolve(__dirname, '../', file)),
    { absolute: true },
  ).then((envPaths) => envPaths.filter((envPath) => fs.existsSync(envPath)));

  if (ENV_PATHS.length > 0) {
    dotenvx.config({
      path: ENV_PATHS,
      encoding: 'utf8',
      quiet: env.NODE_ENV !== 'development',
    });
  }
}
