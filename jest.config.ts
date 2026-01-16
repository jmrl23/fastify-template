import { Config } from '@jest/types';
import fs from 'node:fs';
import path from 'node:path';
import { pathsToModuleNameMapper } from 'ts-jest';

const tsconfig = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'tsconfig.json'), 'utf-8'),
);

export default {
  testEnvironment: 'node',
  rootDir: path.resolve(__dirname, tsconfig.compilerOptions.baseUrl),
  modulePathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/coverage/'],
  globalSetup: '<rootDir>/../jest.global-setup.ts',
  globalTeardown: '<rootDir>/../jest.global-teardown.ts',
  testMatch: ['**/?(*.)+(spec|test).[tj]s'],
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
      prefix: '<rootDir>',
    }),
  },
  transform: {
    '^.+\\.(t|j)s?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
          },
          target: 'es2024',
        },
        module: {
          type: 'commonjs',
        },
      },
    ],
  },
  coverageDirectory: '<rootDir>/../coverage',
  coveragePathIgnorePatterns: ['plugins'],
} satisfies Config.InitialOptions;
