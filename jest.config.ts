import { Config } from 'jest';
import fs from 'node:fs';
import { pathsToModuleNameMapper } from 'ts-jest';

const tsonfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf-8'));
const config: Config = {
  testEnvironment: 'node',
  rootDir: './src',
  globalSetup: '<rootDir>/test.ts',
  testPathIgnorePatterns: ['<rootDir>/test.ts'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s'],
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: pathsToModuleNameMapper(tsonfig.compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
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
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: ['<rootDir>/test.ts', 'plugins', 'schemas'],
};
export default config;
