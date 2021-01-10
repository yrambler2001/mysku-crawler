module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended', 'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/prop-types': 0,
    'class-methods-use-this': 0,
    'no-underscore-dangle': 0,
    'no-console': 0,
    camelcase: 0,
    'no-unused-vars': 'warn',
    'import/prefer-default-export': 0,
    'no-unused-expressions': 0,
  },
  settings: {
    react: {
      version: '16.12.0',
    },
  },
};
