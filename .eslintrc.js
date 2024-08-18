module.exports = {
  extends: ["mantine", "plugin:@next/next/recommended"],
  overrides: [],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "@typescript-eslint/no-shadow": "off",
    "arrow-body-style": "off",
    "react/react-in-jsx-scope": "off",
    "import/extensions": "off",
    "@typescript-eslint/quotes": [2, "double", { avoidEscape: true }],
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-unused-vars": "off",
  },
};
