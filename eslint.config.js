import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";
import cypress from "eslint-plugin-cypress";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  {
    ignores: ["dist/**"],
  },
  //  JavaScript base
  {
    files: ["src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {},
  },

  //  TypeScript base
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
  },

  //  Cypress support
  {
    files: ["cypress/**/*.{js,ts}"],
    plugins: { cypress },
    rules: {
      "cypress/no-unnecessary-waiting": "warn",
    },
  },

  //  Vitest global declarations
  {
    files: ["**/*.test.{js,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        vi: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
      },
    },
    rules: {
      "no-empty-function": "warn",
      "no-restricted-syntax": [
        "warn",
        {
          selector: "CallExpression[callee.name='only']",
          message: "Don't leave focused tests in PRs",
        },
      ],
    },
  },

  //  React + a11y + Prettier
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      react: pluginReact,
      "jsx-a11y": jsxA11y,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/label-has-associated-control": "warn",
      "jsx-a11y/no-autofocus": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
    },
    extends: [eslintConfigPrettier],
  },
]);
