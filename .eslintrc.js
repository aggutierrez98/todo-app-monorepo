const RULES = {
  OFF: "off",
  WARN: "warn",
  ERROR: "error",
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:cypress/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  rules: {
    "react/jsx-uses-react": RULES.ERROR,
    "react/jsx-uses-vars": RULES.ERROR,
    "smart-tabs": RULES.OFF,
    "react/prop-types": RULES.OFF,
    "no-unused-vars": [RULES.WARN, { ignoreRestSiblings: true }],
    "no-warning-comments": [
      RULES.OFF,
      {
        terms: ["todo", "fixme", "xxx"],
        location: "start",
      },
    ],
    "capitalized-comments": [
      RULES.OFF,
      {
        ignorePattern: "pragma|ignored",
        ignoreInlineComments: true,
      },
    ],
  },
  ignorePatterns: ["build"],
  settings: {
    react: {
      version: "detect",
    },
  },
};
