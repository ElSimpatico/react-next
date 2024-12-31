import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import parser from "@typescript-eslint/parser";
import importOrderRules from "./eslint-import-config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

export default [
    ...compat.extends("next/core-web-vitals"),
    ...compat.extends("plugin:@typescript-eslint/recommended"),
    ...compat.extends("plugin:prettier/recommended"),
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            parser: parser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: "module",
                project: "./tsconfig.json",
            },
        },
        rules: {
            "prettier/prettier": "error",
            "react/react-in-jsx-scope": "off",
            "no-console": ["error", { allow: ["warn", "error", "info"] }],
            "import/order": [...importOrderRules],
        },
        settings: {
            next: {
                rootDir: "src",
            },
        },
    },
    {
        ignores: [
            "node_modules/",
            ".next/",
            "dist/",
            ".lintstagedrc.json",
            "commitlint.config.js",
            "eslint.config.js",
            "eslint-import-config.js",
            "pnpm.lock.yaml",
            "**/*.d.ts",
        ],
    },
];
