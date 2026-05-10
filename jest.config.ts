/// <reference types="node" />
import { Config } from '@jest/types';
import path from 'node:path';

export default {
  testEnvironment: 'node',
  rootDir: path.resolve(__dirname, 'src'),
  modulePathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/coverage/'],
  globalSetup: '<rootDir>/../jest.global-setup.ts',
  globalTeardown: '<rootDir>/../jest.global-teardown.ts',
  testMatch: ['**/?(*.)+(spec|test).[tj]s'],
  moduleFileExtensions: ['ts', 'js'],
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
