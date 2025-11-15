import { FastifyInstance, RegisterOptions } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import * as glob from 'glob';
import path from 'node:path';

export interface Options extends RegisterOptions {
  location: string;
  onRegistered?(files: string[]): void;
}

export interface RouteFunction {
  (router: FastifyInstance): Promise<void>;
}

export const routes = fastifyPlugin<Options>(async function routes(
  app: FastifyInstance,
  options: Options,
) {
  const files = await glob.glob([`${options.location}/**/*.route.{ts,js}`], {
    absolute: true,
  });
  const imports = await Promise.all(
    files.map(
      (routeFile) =>
        new Promise<{
          path: string;
          module: {
            options: RegisterOptions;
            default: RouteFunction;
          };
        }>(async (resolve) => {
          const module = await import(routeFile);
          resolve({
            path: routeFile,
            module,
          });
        }),
    ),
  );
  const routes = imports.filter(
    ({ module }) => module.default && typeof module.default === 'function',
  );
  await Promise.all(
    routes.map((route) => {
      const routeOptions = route.module.options || {};
      if (routeOptions.prefix && typeof routeOptions.prefix !== 'string') {
        throw new Error(
          `Route ${route.path} has invalid prefix ${routeOptions.prefix}`,
        );
      } else if (!routeOptions.prefix) {
        const filepath = route.path
          .replace(/[\\/]/g, '/')
          .substring(options.location.length);
        const filename = path.basename(filepath);
        routeOptions.prefix = filepath.substring(
          0,
          filepath.length - filename.length - 1,
        );
      }
      if (!routeOptions.prefix?.startsWith('/')) {
        routeOptions.prefix = `/${routeOptions.prefix}`;
      }
      const prefixes = [options.prefix, routeOptions.prefix];
      let prefix = prefixes.join('');
      if (!routeOptions.prefix?.startsWith('/')) {
        routeOptions.prefix = `/${routeOptions.prefix}`;
      }
      if (!prefix.startsWith('/')) {
        prefix = `/${prefix}`;
      }
      return app.register(route.module.default, { ...routeOptions, prefix });
    }),
  );
  options.onRegistered?.(routes.map((route) => route.path));
});

export function asRouteFunction(fn: RouteFunction): RouteFunction {
  return fn;
}
export function asRouteOptions(options: RegisterOptions): RegisterOptions {
  return options;
}
