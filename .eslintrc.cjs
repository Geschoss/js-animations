/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:sonarjs/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort', 'sonarjs'],
  root: true,
  rules: {
    'no-var': 'off',
    'prefer-const': 'off',

    // ts
    '@typescript-eslint/no-explicit-any': 'off',

    //
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // complexity
    complexity: ['error', 10],
  },
  ignorePatterns: ['dist/*'],
};
