import { get } from 'env-var';

const env = {
  NODE_ENV: () =>
    get('NODE_ENV')
      .default('development')
      .asEnum(['development', 'test', 'production']),

  PORT: () => get('PORT').default(3001).asPortNumber(),

  TRUST_PROXY: () => get('TRUST_PROXY').default('loopback').asString(),

  CORS_ORIGIN: () => get('CORS_ORIGIN').asArray(','),

  SWAGGER_SERVERS: () => get('SWAGGER_SERVERS').asArray(','),
};

/**
 * Proxy of `env` object which invoke its methods to
 * get fresh values from its source.
 *
 * Using methods instead of direct properties from `env`
 * ensures that the values are always fresh.
 */
const proxy = new Proxy(env, {
  get(target, key: keyof typeof env) {
    const value = target[key];
    if (typeof target[key] === 'function') {
      return (value as () => unknown)();
    }
    return value;
  },
}) as unknown as {
  [P in keyof typeof env]: (typeof env)[P] extends (...args: any) => any
    ? ReturnType<(typeof env)[P]>
    : (typeof env)[P];
};
export { proxy as env };
