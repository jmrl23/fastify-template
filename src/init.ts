import dotenvx from '@dotenvx/dotenvx';
import * as glob from 'glob';
import path from 'node:path';
import workerThreads from 'node:worker_threads';

declare global {
  type NodeEnv = 'development' | 'production' | 'test';
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: NodeEnv;
    }
  }
}

if (workerThreads.isMainThread) {
  if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = 'development';
  }

  const ENV_PATHS = glob.globSync(
    [
      `.env.${process.env.NODE_ENV}.local`,
      '.env.local',
      `.env.${process.env.NODE_ENV}`,
      '.env',
    ].map((file) => path.resolve(__dirname, '../', file)),
    {
      absolute: true,
    },
  );

  dotenvx.config({
    path: ENV_PATHS,
    encoding: 'utf8',
    quiet: process.env.NODE_ENV !== 'development',
  });
}
