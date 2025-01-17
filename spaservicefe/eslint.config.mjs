import globals from 'globals'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser' // Parser cho TypeScript
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintPluginTailwindCSS from 'eslint-plugin-tailwindcss'

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'], // Định nghĩa các file áp dụng
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      },
      globals: globals.browser
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: eslintPluginPrettier,
      tailwindcss: eslintPluginTailwindCSS
    },
    rules: {
      // Các quy tắc ESLint
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          semi: false,
          trailingComma: 'none',
          tabWidth: 2,
          endOfLine: 'auto',
          useTabs: false,
          singleQuote: true,
          printWidth: 120,
          jsxSingleQuote: true
        }
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'off'
    },
    ignores: ['**/node_modules/', '**/dist/']
  }
]
