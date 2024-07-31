// eslint-disable-next-line @typescript-eslint/no-var-requires
const standard = require("eslint-config-standard");

module.exports = {
  ...standard,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  env: {
    es2021: true,
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended", // 使用推荐的 TypeScript 规则
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "no-console": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "off", // 禁用 no-explicit-any 规则
  },
};
