import globals from 'globals';
import tseslint, { Config } from 'typescript-eslint';

const config: Config = [
  {
    ignores: ['./build/', './src/coverage/'],
  },
  {
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
];
export default config;
