import { get } from 'env-var';

/**
 * Here is where you define your environment variables, to be precise,
 * methods that return the value of the environment variable.
 */
const env = {
  NODE_ENV: () =>
    get('NODE_ENV')
      .default('development')
      .asEnum(['development', 'test', 'production']),

  PORT: () => get('PORT').default(3001).asPortNumber(),

  TRUST_PROXY: () => get('TRUST_PROXY').default('loopback').asString(),

  CORS_ORIGIN: () => get('CORS_ORIGIN').asArray(','),
};

/**
 * **Proxy**
 *
 * This proxy allows you to access fresh values of the environment variables.
 */
const proxy = new Proxy(env, {
  get(target, key: keyof typeof env) {
    if (typeof target[key] === 'function') return target[key]();
    return target[key];
  },
}) as unknown as {
  [P in keyof typeof env]: ReturnType<(typeof env)[P]>;
};

export { proxy as env };
