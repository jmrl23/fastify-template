import type { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import fs from 'node:fs';
import path from 'node:path';

export default fastifyPlugin(async function routesPlugin(
  app: FastifyInstance,
  { dir, callback }: Options,
) {
  const files = getFileList(dir);
  const routeFiles = files.filter((fileName) => {
    const isRouteFile = /\.route\.(ts|js|cjs|mjs)$/.test(fileName);
    return isRouteFile;
  });

  for (const routeFile of routeFiles) {
    const route = await import(routeFile);
    const _path = routeFile
      .substring(dir.length)
      .replace(/[\\\/]/g, '/')
      .split('/');
    _path.splice(-1);
    const prefix = route.prefix ?? _path.join('/');

    app.register(route, {
      prefix,
    });
  }

  callback?.(routeFiles);
});

function getFileList(dir: string): string[] {
  const files: string[] = [];
  const dirFiles = fs.readdirSync(dirPath);

  for (const file of dirFiles) {
    const filePath = path.resolve(dirPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      files.push(...getFileList(filePath));
      continue;
    }
    files.push(filePath);
  }

  return files;
}

interface Options {
  dir: string;
  callback?: Callback;
}

interface Callback {
  (routeFiles: string[]): void;
}
