import dotenvx from '@dotenvx/dotenvx';
import { glob } from 'glob';
import fs from 'node:fs';
import path from 'node:path';

export async function init() {
  await loadEnv();
}

async function loadEnv() {
  if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = 'development';
  }

  const NODE_ENV = process.env.NODE_ENV;

  const entries = await glob(
    [`.env.${NODE_ENV}.local`, `.env.${NODE_ENV}`, '.env.local', '.env'].map(
      (file) => path.resolve(__dirname, '../', file),
    ),
    { absolute: true },
  ).then((entries) => entries.filter((entry) => fs.existsSync(entry)));

  if (entries.length > 0) {
    dotenvx.config({
      path: entries,
      encoding: 'utf8',
      quiet: NODE_ENV !== 'development',
    });
  }
}
