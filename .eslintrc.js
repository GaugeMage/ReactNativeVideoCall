module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'indent': ['error', 4, {'SwitchCase': 1}],
        'object-curly-spacing': [1, 'never'],
        'no-trailing-spaces': 'error',
        'comma-spacing': ['error', {'before': false, 'after': true}],
        'comma-style': ['error', 'last'],
        'curly': ['error', 'all'],
        'array-bracket-spacing': ['error', 'never'],
        'semi': ['error', 'always'],
        'quotes': [1, 'double'],
        'eol-last': ['error', 'never'],
        'keyword-spacing': 'off',
      },
    },
  ],
};
