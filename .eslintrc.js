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
    // "plugin:cypress/recommended",
    "cypress",
    "plugin:react/recommended",
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
    "no-warning-comments": [
      0,
      {
        terms: ["todo", "fixme", "xxx"],
        location: "start",
      },
    ],
    "capitalized-comments": [
      0,
      {
        ignorePattern: "pragma|ignored",
        ignoreInlineComments: true,
      },
    ],
  },
};
