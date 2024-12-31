"use client";
import {
    ChakraProvider,
    defineConfig,
    createSystem,
    defaultConfig,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const config = defineConfig({
    cssVarsPrefix: "nx",
    globalCss: {
        "html, body": {
            maxWidth: "100vw",
            overflowX: "hidden",
        },
    },
});

const system = createSystem(defaultConfig, config);

export default function ThemeProvider({ children }: PropsWithChildren) {
    return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
