import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

export default [
    ...compat.extends("next/core-web-vitals"),
    ...compat.extends("next/typescript"),
    ...compat.extends("plugin:prettier/recommended"),
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        rules: {
            "prettier/prettier": "error",
            "react/react-in-jsx-scope": "off",
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
            "pnpm.lock.yaml",
            "**/*.d.ts",
        ],
    },
];
