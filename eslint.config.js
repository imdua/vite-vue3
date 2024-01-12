import globals from "globals";

export default [
  { ignores: ["node_modules/**", "dist/**"] },
  {
    files: ["**/*.md"],
    processor: "markdown/markdown",
  },
  {
    root: true,
    plugins: ["vue", "markdown"],
    extends: [
      "eslint:recommended",
      "plugin:vue/vue3-essential",
      "plugin:markdown/recommended",
    ],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {},
    files: [],
  },
];
