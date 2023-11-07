module.exports = {
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src"]
      }
    },
  },
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'standard-with-typescript',
    'plugin:react/jsx-runtime',
    "react-app"
  ],
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'parserOptions': {
    'project': ['./tsconfig.json'],
  },
  'rules': {
    'strict': 0,
    'quotes': [2, 'single'],
    'linebreak-style': [2, 'unix'],
    'semi': [2, 'never'],
    'space-before-blocks': 2,
    'space-infix-ops': 2,
    'array-bracket-spacing': [2, 'never'],
    'object-curly-spacing': [2, 'always'],
    'space-in-parens': [2, 'never'],
    'block-spacing': [2, 'always'],
    'brace-style': [2, '1tbs', { 'allowSingleLine': true }],
    'comma-spacing': [2, { 'before': false, 'after': true }],
    'comma-style': [2, 'last'],
    'prefer-arrow-callback': [2, { 'allowNamedFunctions': true }],
    'prefer-const': 1,
    'react/no-multi-comp': [2, { 'ignoreStateless': true }],
    'react/no-did-mount-set-state': 2,
    'react/no-unescaped-entities': 0,
    'react/prop-types': 2,
    'no-extra-boolean-cast': 0,
    'no-console': ['warn', { 'allow': ['error'] }],
    'no-debugger': 'warn',
    'react/jsx-curly-spacing': [2, { 'when': 'always', 'children': true }],
    'react/jsx-curly-brace-presence': [2, { 'props': 'never', 'children': 'never' }],
    'react/no-unused-prop-types': 2,
    'arrow-parens': [2, 'as-needed'],
    'id-length': ['error', { 'exceptions': ['e', 'i', 'x', 'y', 'a', 'b', '_'] }],
    'no-restricted-imports': ['error', {
      'patterns': [{
        'group': ['moment', 'moment/moment'],
        'message': 'Import from moment-timezone instead.',
      }],
    },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/strict-boolean-expressions": ["error", {
      'allowString': true, 
      'allowNumber': true,
      'allowNullableBoolean': true,
      'allowNullableString': true,
      'allowNullableNumber': true,
    }],
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/no-misused-promises": "off",
  },
}
