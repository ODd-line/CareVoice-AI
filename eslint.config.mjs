import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      eqeqeq: ["error", "always"],
      "no-eval": "error",
      "no-implicit-coercion": "error",
      "no-warning-comments": ["warn", { terms: ["todo", "fixme", "hack", "xxx"], location: "start" }]
    }
  },
  globalIgnores([
    ".next/**",
    ".npm-cache/**",
    "node_modules/**",
    "carevoice-android/**",
    "carevoice-edge/dist/**",
    "app.js",
    "carevoice-micro.js",
    "firebase-config.js",
    "market-insights.js",
    "sw.js"
  ])
]);