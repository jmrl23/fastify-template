import env from 'env-var';

export const NODE_ENV = env.get('NODE_ENV').default('development').asString();

export const PORT = env.get('PORT').default(3001).asPortNumber();
