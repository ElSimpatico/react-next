"use client";
import { Flex, Link as ChakraLink } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

import { Entities } from "@/constants/entities";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/routing";
import { Technology } from "@/models/Technology";

export default function NameCell({ logoImageUrl, name, id }: Technology) {
    return (
        <Flex alignItems={"center"} gap={5}>
            <Image
                src={logoImageUrl}
                alt={name}
                width={72}
                height={72}
                unoptimized
            />
            <ChakraLink asChild>
                <Link
                    href={ROUTES.DETAIL.replace(
                        "[entity]",
                        Entities.TECHNOLOGIES,
                    ).replace("[id]", id)}
                >
                    {name}
                </Link>
            </ChakraLink>
        </Flex>
    );
}
