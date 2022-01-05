module.exports = {
  parser: "babel-eslint",
  globals: {
    NODE_ENV: "readonly",
    PATH_PREFIX: "readonly",
    GEOSERVER: "readonly",
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "eslint:recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    quotes: ["error", "double"],
    "react/prop-types": "off"
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
