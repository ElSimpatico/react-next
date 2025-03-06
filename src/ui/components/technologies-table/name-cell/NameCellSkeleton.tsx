import { Flex, Skeleton } from "@chakra-ui/react";
import React from "react";

export default function NameCellSkeleton() {
    return (
        <Flex alignItems={"center"} gap={5}>
            <Skeleton width={"72px"} height={"72px"} />
            <Skeleton width={"200px"} height={"24px"} />
        </Flex>
    );
}
