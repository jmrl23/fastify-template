import dotenvx from '@dotenvx/dotenvx';
import * as glob from 'glob';
import fs from 'node:fs';
import path from 'node:path';
import workerThreads from 'node:worker_threads';

if (workerThreads.isMainThread) {
  if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = 'development';
  }

  const ENV_PATHS = glob
    .globSync(
      [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
        '.env.local',
        '.env',
      ].map((file) => path.resolve(__dirname, '../', file)),
      { absolute: true },
    )
    .filter((envPath) => fs.existsSync(envPath));

  if (ENV_PATHS.length > 0) {
    dotenvx.config({
      path: ENV_PATHS,
      encoding: 'utf8',
      quiet: process.env.NODE_ENV !== 'development',
    });
  }
}
