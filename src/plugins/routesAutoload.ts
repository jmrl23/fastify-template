import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { glob } from 'glob';
import path from 'node:path';

export interface Options {
  /**
   * The directory path where route files are located. Route files are recursively searched.
   */
  dirPath: string;
  /**
   * Optional callback function executed after all routes are registered.
   */
  callback?: Callback;
}
export interface Callback {
  (routeFiles: string[]): void;
}

/**
 * The routes autoload plugin for Fastify.
 * Recursively searches a specified directory for route files and registers them.
 *
 * Route file requirements:
 * - Filename must end with `.route.{ts,js}`.
 * - Must export a function as the **default** export (the Fastify route function).
 * - **Prefix Resolution:** Uses an exported `prefix` string constant if available; otherwise, it derives the prefix from the directory structure relative to `dirPath`.
 *
 * @param {FastifyInstance} app - The Fastify instance.
 * @param {Options} options - Plugin options.
 * @returns {Promise<void>}
 */
export const routesAutoload: FastifyPluginAsync<Options> = fastifyPlugin(
  async function (app: FastifyInstance, options: Options) {
    const { dirPath, callback } = options;
    const files = await glob([`${dirPath}/**/*.route.{ts,js}`], {
      absolute: true,
    });
    const registeredRouteFiles: string[] = [];
    for (const routeFile of files) {
      const route = await import(routeFile);

      if (typeof route.default !== 'function') continue;

      const _path = routeFile.replace(/[\\/]/g, '/').substring(dirPath.length);
      const fileName = path.basename(routeFile);

      if ('prefix' in route && typeof route.prefix !== 'string') {
        throw new Error(
          `Invalid route prefix exported in file: ${routeFile}. It must be a string.`,
        );
      }

      const prefix =
        route.prefix ??
        (_path.substring(0, _path.length - fileName.length - 1) || '/');

      app.register(route, { prefix });
      registeredRouteFiles.push(routeFile);
    }

    callback?.(registeredRouteFiles);
  },
);
