/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    'prettier'
  ],
  plugins: [
    'simple-import-sort'
  ],
  rules: {
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        'vars': 'all',
        'args': 'after-used',
        'argsIgnorePattern': '^_'
      }
    ],
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-empty-interface': 'warn',
    'react/self-closing-comp': [
      'warn',
      {
        'component': true,
        'html': true
      }
    ],
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        'fixStyle': 'inline-type-imports'
      }
    ],
  }
};
