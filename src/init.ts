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

if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = 'development';
}

const ENV_PATHS = glob.globSync(
  [
    '.env',
    `.env.${process.env.NODE_ENV}`,
    '.env.local',
    `.env.${process.env.NODE_ENV}.local`,
  ].map((file) => path.resolve(__dirname, '../', file)),
  {
    absolute: true,
  },
);

if (workerThreads.isMainThread) {
  dotenvx.config({
    path: ENV_PATHS,
    encoding: 'utf8',
    quiet: process.env.NODE_ENV !== 'development',
    // Override is true to allow .env files injection precedence
    override: true,
  });
}
