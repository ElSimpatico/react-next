"use client";
import { IconButton, HStack } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";

import { LINKS } from "@/constants/links";
import { CommonProps } from "@/types/commonProps";
import HeaderMenu from "@/ui/components/heder-menu/headerMenu";
import Navbar from "@/ui/components/navbar/navbar";
import { useBreakpoint } from "@/ui/hooks/useBreakpoint";

import styles from "./header.module.scss";

export default function Header({ testId }: CommonProps) {
    const breakpoint = useBreakpoint();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <header data-testid={testId} className={styles.header}>
            <HStack w="auto" verticalAlign="middle">
                <IconButton
                    aria-label="open menu"
                    variant={"outline"}
                    size="md"
                    onClick={() => setIsOpen(true)}
                >
                    <CiMenuBurger />
                </IconButton>
            </HStack>
            <Image
                className={styles.logo}
                src="/next.svg"
                alt="Next.js logo"
                layout="responsive"
                width={16}
                height={9}
                priority
            />
            {breakpoint !== "S" && <Navbar links={LINKS} />}
            <HeaderMenu
                open={isOpen}
                fullWidth={breakpoint === "S"}
                onClose={() => setIsOpen(false)}
            />
        </header>
    );
}
