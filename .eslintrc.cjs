module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
     "plugin:@typescript-eslint/recommended"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'react-hooks', "@typescript-eslint"],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 0,
    "prefer-const": "warn", // предпочитаем константы let-ам
    "quotes": ["warn", "single"], // кавычки в js-коде - одинарные
    "jsx-quotes": ["warn", "prefer-double"], // кавычки в jsx-коде - двойные
    "max-len": ["warn", { "code": 120 }], // макс. длина строки - 120 символов
    "semi": ["warn", "always"], // проверка точек с запятой всегда
    "@typescript-eslint/no-unused-vars": "warn",
    "react-hooks/rules-of-hooks": "error",
    "@typescript-eslint/consistent-type-definitions": "error"
  },
}
