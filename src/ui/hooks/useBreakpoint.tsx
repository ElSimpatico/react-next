import { useBreakpointValue } from "@chakra-ui/react";

type BrekpointSize = "S" | "M" | "L" | "XL";

export const useBreakpoint = (): BrekpointSize => {
    const size = useBreakpointValue<BrekpointSize>({
        base: "S",
        sm: "S",
        md: "M",
        lg: "L",
        xl: "XL",
    });

    return size || "S";
};
