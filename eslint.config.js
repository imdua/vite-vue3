// import globals from "globals";
// import eslintConfigPrettier from "eslint-config-prettier";
// import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginVue from "eslint-plugin-vue";
import eslintPluginMarkdown from "eslint-plugin-markdown";

export default [
  { ignores: ["node_modules", "dist"] },
  {
    files: ["**/*.md"],
    plugins: {
      eslintPluginMarkdown,
    },
    processor: "markdown/markdown",
  },
  {
    root: true,
    plugins: {
      eslintPluginVue,
      eslintPluginMarkdown,
    },
    // extends: [
    //   "eslint:recommended",
    //   "plugin:vue/vue3-essential",
    //   "plugin:markdown/recommended",
    // ],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {},
    files: [],
  },
  // eslintConfigPrettier,
  // eslintPluginPrettier,
  eslintPluginPrettierRecommended, // config, plugin 한번에 설정
];
