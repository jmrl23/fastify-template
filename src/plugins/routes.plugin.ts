import type { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import path from 'node:path';
import util from 'node:util';
import getFileList from '../lib/util/getFileList';

export default fastifyPlugin(
  async function routesPlugin(
    app: FastifyInstance,
    { dirPath, callback }: Options,
  ) {
    const files = getFileList(dirPath);
    const routeFiles = files.filter((file) => {
      const extensions = ['js', 'ts'];
      const fileName = path.basename(file);
      const isRouteFile = extensions.some((ext) =>
        fileName.toLowerCase().endsWith(`.route.${ext}`),
      );
      return isRouteFile;
    });
    const registeredRouteFiles = [];
    for (const routeFile of routeFiles) {
      const route = await import(routeFile);
      if (!util.types.isAsyncFunction(route.default)) continue;
      const _path = routeFile.replace(/[\\\/]/g, '/').substring(dirPath.length);
      const fileName = path.basename(routeFile);
      if ('prefix' in route && typeof route.prefix !== 'string')
        throw new Error('Invalid route prefix');
      const prefix =
        route.prefix ??
        (_path.substring(0, _path.length - fileName.length - 1) || '/');

      app.register(route, {
        prefix,
      });
      registeredRouteFiles.push(routeFile);
    }

    callback?.(registeredRouteFiles);
  },
  {
    name: 'routesPlugin',
  },
);

interface Options {
  dirPath: string;
  callback?: Callback;
}

interface Callback {
  (routeFiles: string[]): void;
}
