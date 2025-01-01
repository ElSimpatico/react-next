const importOrderConfig = require("./eslint-import-config.js"); // Importa la configuración de imports

module.exports = {
    extends: [
        "next/core-web-vitals",
        "next/typescript",
        "plugin:import/errors",
        "plugin:import/warnings",
    ],
    plugins: ["import"],
    rules: {
        "no-console": ["error", { allow: ["warn", "error", "info"] }],
        ...importOrderConfig,
    },
};
