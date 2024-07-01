import path from 'node:path';
import dotenv from 'dotenv';
import * as c from 'colorette';
import logger from './lib/util/logger';
import { globSync } from 'glob';

console.clear();

const NODE_ENV = process.env.NODE_ENV ?? 'development';

const envPaths = globSync([
  '.env',
  `.env.${NODE_ENV}`,
  '.env.local',
  `.env.${NODE_ENV}.local`,
]);

for (const filePath of envPaths) {
  const { parsed } = dotenv.config({
    path: filePath,
    override: true,
  });
  if (Object.keys(parsed ?? {}).length < 1) continue;
  const fileName = path.basename(filePath);
  logger.debug(`DotEnvFile ${c.yellow('Loaded')} ${c.magentaBright(fileName)}`);
}
