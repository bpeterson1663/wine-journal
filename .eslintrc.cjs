module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "parserOptions": {
        "project": ["./tsconfig.json"]
    },
    "rules": {
        'strict': 0,
        'indent': [2, 2, { 'SwitchCase': 1 }],
        'quotes': [2, 'single'],
        'linebreak-style': [2, 'unix'],
        'semi': [2, 'never'],
        'space-before-blocks': 2,
    'space-infix-ops': 2,
    'space-before-function-paren': [2, { 'anonymous': 'always', 'named': 'never' }],
    'array-bracket-spacing': [2, 'never'],
    'object-curly-spacing': [2, 'always'],
    'space-in-parens': [2, 'never'],
    'block-spacing': [2, 'always'],
    'brace-style': [2, '1tbs', { 'allowSingleLine': true }],
    'comma-spacing': [2, { 'before': false, 'after': true }],
    'comma-style': [2, 'last'],
    'comma-dangle': [2, 'always-multiline'],
    'prefer-arrow-callback': [2, { 'allowNamedFunctions': true }],
    'prefer-const': 1,
    'react/no-multi-comp': [2, { 'ignoreStateless': true }],
    'react/no-did-mount-set-state': 2,
    'react/no-unescaped-entities': 0,
    'react/prop-types': 2,
    'no-extra-boolean-cast': 0,
    'no-console': ['error', { 'allow': ['warn', 'error'] }],
    'no-relative-import-paths/no-relative-import-paths': ['error', { 'allowSameFolder': true, 'rootDir': 'app' }],
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
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // 'max-len': ['warn', { 'code': 120 }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/newline-after-import': 'error',
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    }
}
