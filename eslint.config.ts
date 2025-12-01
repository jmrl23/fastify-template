import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import fs from 'node:fs';
import path from 'node:path';
import tseslint from 'typescript-eslint';

const gitIngnorePath = path.resolve(__dirname, '.gitignore');
const gitIgnoreContent = fs.existsSync(gitIngnorePath)
  ? fs.readFileSync(gitIngnorePath, 'utf-8')
  : '';
const gitIgnored = gitIgnoreContent
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => Boolean(line));

export default defineConfig([
  globalIgnores([...gitIgnored]),
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2024,
      },
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
]);
