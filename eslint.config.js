import js from '@eslint/js';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import astroPlugin from 'eslint-plugin-astro';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,astro}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error'
    }
  },
  {
    files: ['**/*.astro'],
    plugins: {
      astro: astroPlugin
    },
    processor: 'astro/client-side-ts',
    rules: {
      ...astroPlugin.configs.recommended.rules,
      // Disable some rules that are problematic with Astro
      '@typescript-eslint/no-unused-vars': 'off',
      'no-undef': 'off'
    }
  },
  {
    files: ['**/*.{js,mjs}'],
    languageOptions: {
      globals: {
        node: true
      }
    }
  },
  {
    ignores: [
      'dist/',
      'node_modules/',
      '.astro/',
      'public/'
    ]
  }
];