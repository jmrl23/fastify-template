import dotenv from 'dotenv';
import * as glob from 'glob';
import path from 'node:path';

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

dotenv.config({
  path: ENV_PATHS,
  // Override is true to allow .env files precedence
  override: true,
});
