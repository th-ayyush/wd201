import { defineConfig } from 'eslint';

export default defineConfig({
  languageOptions: {
    ecmaVersion: 12,  // Enables ECMAScript 2021 features
    sourceType: 'module', // Support for ES6 modules
    globals: {
      window: 'readonly', // Makes the browser's global `window` variable readonly
      document: 'readonly', // Makes the `document` object readonly
      process: 'readonly', // Makes the Node.js `process` object readonly
    },
  },
  extends: [
    'eslint:recommended', // Use recommended rules from ESLint
    'plugin:node/recommended', // Enables node.js plugin rules
  ],
  rules: {
    'no-undef': 'error', // Ensures all variables are defined before use
    'no-console': 'warn', // Warn about the usage of `console.log`
    'prefer-const': 'warn', // Suggest using `const` where variables are not reassigned
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn about unused variables, ignore those starting with `_`
    'consistent-return': 'off', // Allow functions to not consistently return a value
    'eqeqeq': 'error', // Enforces the use of strict equality (===) over `==`
    'curly': 'error', // Requires curly braces around control statements
    'semi': ['error', 'always'], // Enforces semicolons at the end of statements
  },
});
