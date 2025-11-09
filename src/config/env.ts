import * as env from 'env-var';

export const NODE_ENV = env
  .get('NODE_ENV')
  .default('development')
  .asEnum(['development', 'test', 'production']);

export const PORT = env.get('PORT').default(3001).asPortNumber();

export const TRUST_PROXY = env
  .get('TRUST_PROXY')
  .default('loopback')
  .asString();

export const CORS_ORIGIN = env.get('CORS_ORIGIN').asArray(',');
