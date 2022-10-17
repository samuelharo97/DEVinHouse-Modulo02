module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ], // Mostra como erro as opções setadas no prettierrc
    'no-console': 'off', // Permite usar console.log
    semi: ['error', 'always'], // Opcional para quem gosta de manter ponto e virgula
    quotes: ['error', 'single'], // Opcional para quem prefere aspas simples
    'no-var': 'error', // Opcional para quem quer evitar uso de var, somente let e const
    'prefer-const': 'error', // Opcional de alerta para const em declarações de variaveis que não serão re-assinadas
  },
};
