module.exports = {
    "import/order": [
        "error",
        {
            groups: [
                ["builtin", "external"],
                ["internal"],
                ["parent", "sibling"],
                ["index"],
                ["type"],
            ],
            pathGroups: [
                {
                    pattern: "*.scss",
                    group: "index",
                    position: "after",
                },
                {
                    pattern: "./*.scss",
                    group: "sibling",
                    position: "after",
                },
            ],
            pathGroupsExcludedImportTypes: ["builtin"],
            "newlines-between": "always",
            alphabetize: {
                order: "asc",
                caseInsensitive: true,
            },
        },
    ],
};
