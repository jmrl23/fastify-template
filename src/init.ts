import * as c from 'colorette';
import dotenv from 'dotenv';
import { globSync } from 'glob';
import logger from './lib/util/logger';

console.clear();

// Set `process.env.NODE_ENV` possible values
declare global {
  type NodeEnv = (typeof NODE_ENV_VALUES)[number];
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: NodeEnv;
    }
  }
}
const NODE_ENV_VALUES = ['development', 'production', 'test'] as const;
if (process.env.NODE_ENV === undefined) process.env.NODE_ENV = 'development';
if (!NODE_ENV_VALUES.includes(process.env.NODE_ENV))
  throw new Error('Invalid `NODE_ENV` value');
const NODE_ENV = process.env.NODE_ENV;
// --

const envPaths = globSync(
  [
    '.env',
    `.env.${process.env.NODE_ENV}`,
    '.env.local',
    `.env.${process.env.NODE_ENV}.local`,
  ],
  { absolute: true },
);

for (const filePath of envPaths) {
  const { parsed } = dotenv.config({
    path: filePath,
    override: true,
  });
  const keys = Object.keys(parsed ?? {});
  if (keys.length < 1) continue;
  if (keys.includes('NODE_ENV')) {
    process.env.NODE_ENV = NODE_ENV;
    logger.warn('Tried to alter `NODE_ENV` using a .env file');
  }
  logger.info(`${c.bold('registered env')} ${filePath}`);
}
