import { Config } from 'jest';
const config: Config = {
  testEnvironment: 'node',
  rootDir: './src',
  globalSetup: '<rootDir>/test.ts',
  testPathIgnorePatterns: ['<rootDir>/test.ts'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(t|j)s?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
          },
          target: 'es2016',
        },
        module: {
          type: 'commonjs',
        },
      },
    ],
  },
};
export default config;
