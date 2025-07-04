#!/bin/bash
PROJECT_NAME=ecommerce

# create the projecte
npx @angular/cli@latest new ${PROJECT_NAME} --no-strict --standalone=false --style=css --ssr=no --skip-tests --package-manager="npm"

# install the packages
cd ${PROJECT_NAME}
ng add @angular-eslint/schematics --defaults  --skip-confirmation
npm install --save-dev prettier prettier-eslint eslint-config-prettier eslint-plugin-prettier @awmottaz/prettier-plugin-void-html

# troubleshoot the version of @awmottaz/prettier-plugin-void-html
npm i -D @awmottaz/prettier-plugin-void-html@latest

# overwrite / create config files
cat << EOF > eslint.config.js
// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      eslintPluginPrettierRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
EOF
cat << EOF > .prettierrc.json
{
  "trailingComma": "none",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "overrides": [
    {
      "files": "*.html",
      "options": {
        "parser": "angular",
        "bracketSameLine": true
      }
    }
  ],
  "plugins": ["@awmottaz/prettier-plugin-void-html"]
}
EOF

# generate components
ng g c articles/article-list --inline-style --inline-template
ng g c articles/article-item
ng g c articles/article-new-reactive
ng g c articles/navbar

ng g s services/article-service
ng g p shared/image
