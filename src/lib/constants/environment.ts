import env from 'env-var';

export const nodeEnv = env.get('NODE_ENV').default('development').asString();
