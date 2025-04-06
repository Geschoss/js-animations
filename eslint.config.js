import { globalIgnores } from 'eslint/config';
import sonarjs from 'eslint-plugin-sonarjs';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['**/*.ts'],
    plugins: { 'simple-import-sort': simpleImportSort },
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      sonarjs.configs.recommended,
    ],
    rules: {
      'no-var': 'off',
      'prefer-const': 'off',

      // ts
      '@typescript-eslint/no-explicit-any': 'off',

      //
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // complexity
      complexity: ['error', 11],
      'sonarjs/class-name': 'off',
      'sonarjs/pseudo-random': 'off',
      'sonarjs/no-commented-code': 'off',
      'sonarjs/public-static-readonly': 'off',
      'sonarjs/prefer-single-boolean-return': 'off',
    },
  },
  globalIgnores(['dist/*'])
);
