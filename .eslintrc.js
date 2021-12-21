module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint", "prettier", "react-hooks", "jest"],
  settings: {
    react: {
      pragma: "React",
      version: "detect"
    }
  },
  rules: {
    "@typescript-eslint/no-var-requires": ["error"],
    "@typescript-eslint/interface-name-prefix": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
        maxEOF: 1
      }
    ],
    "prettier/prettier": [
      "error",
      {
        trailingComma: "none",
        singleQuote: false
      }
    ],
    "@typescript-eslint/no-empty-interface": ["off"],
    "@typescript-eslint/no-empty-function": ["off"],
    "@typescript-eslint/explicit-module-boundary-types": ["off"],
    "react-hooks/exhaustive-deps": [
      "error",
      {
        enableDangerousAutofixThisMayCauseInfiniteLoops: true
      }
    ],
    "@typescript-eslint/ban-ts-comment": ["off"],
    "no-restricted-imports": [
      "error",
      {
        patterns: ["@material-ui/*/*/*", "!@material-ui/core/test-utils/*"]
      }
    ]
  }
};
