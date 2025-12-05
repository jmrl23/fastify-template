import { FastifyInstance, RegisterOptions } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { glob } from 'glob';
import path from 'node:path';

export interface Options extends RegisterOptions {
  location: string;
  onRegister?(files: string[]): void;
}

export interface RouteFunction {
  (router: FastifyInstance): Promise<void>;
}

/**
 * A Fastify plugin that automatically loads and registers routes from a specified directory.
 * It scans for files ending in `.route.ts` or `.route.js`, imports them,
 * and registers them as plugins, deriving the route prefix from the file path.
 *
 * The default autoload behavior can be overridden by exporting an `options` variable
 * from a route file using the `asRouteOptions` helper function.
 *
 * @param app The Fastify instance.
 * @param options The plugin options, including the location of the routes directory.
 */
export const routes = fastifyPlugin(
  async function routes(app: FastifyInstance, options: Options) {
    const files = await glob([`${options.location}/**/*.route.{ts,js}`], {
      absolute: true,
    });
    const imports = await Promise.all(
      files.map(
        (routeFile) =>
          new Promise<{
            path: string;
            module: {
              __esModule: true | undefined;
              options?: RegisterOptions;
              default:
                | RouteFunction
                | {
                    options: RegisterOptions;
                    default: RouteFunction;
                  };
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
    const routes = imports.filter(({ module }) => {
      const target =
        module.__esModule === true
          ? typeof module.default === 'object'
            ? module.default.default
            : module.default
          : module.default;
      return target && typeof target === 'function';
    });
    await Promise.all(
      routes.map((route) => {
        const routeOptions =
          (typeof route.module.default === 'object'
            ? route.module.default.options
            : route.module.options) || {};
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
        const routeFunction =
          typeof route.module.default === 'function'
            ? route.module.default
            : route.module.default.default;
        return app.register(routeFunction, { ...routeOptions, prefix });
      }),
    );
    options.onRegister?.(routes.map((route) => route.path));
  },
  {
    name: 'fastify-template-router',
  },
);

/**
 * A helper function to provide type inference for route functions.
 * @param fn The route function to type.
 * @returns The typed route function.
 */
export function asRouteFunction(fn: RouteFunction): RouteFunction {
  return fn;
}

/**
 * A helper function to provide type inference for route options.
 * @param options The route options to type.
 * @returns The typed route options.
 */
export function asRouteOptions(options: RegisterOptions): RegisterOptions {
  return options;
}
