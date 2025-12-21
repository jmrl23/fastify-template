import { get } from 'env-var';

export const NODE_ENV = get('NODE_ENV')
  .default('development')
  .asEnum(['development', 'test', 'production']);

export const PORT = get('PORT').default(3001).asPortNumber();

export const TRUST_PROXY = get('TRUST_PROXY').default('loopback').asArray(',');

export const CORS_ORIGIN = get('CORS_ORIGIN').asArray(',');

export const SWAGGER_SERVERS = get('SWAGGER_SERVERS').asArray(',');
