"use client";
import { IconButton, HStack } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";

import { LINKS } from "@/constants/links";
import { useAuth } from "@/context/AuthProvider";
import { CommonProps } from "@/types/CommonProps";
import HeaderMenu from "@/ui/components/header-menu/HeaderMenu";
import { useBreakpoint } from "@/ui/hooks/useBreakpoint";

import Navbar from "../navbar/navbar";

import styles from "./Header.module.scss";

export default function Header({ testId = "testId" }: CommonProps) {
    const { user, logout } = useAuth();
    const breakpoint = useBreakpoint();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <header data-testid={testId} className={styles.header}>
            {user && (
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
            )}
            <Image
                className={styles.logo}
                src="/next.svg"
                alt="Next.js logo"
                layout="responsive"
                width={16}
                height={9}
                priority
            />
            {user && (
                <>
                    {breakpoint !== "S" && <Navbar links={LINKS} />}
                    <HeaderMenu
                        open={isOpen}
                        fullWidth={breakpoint === "S"}
                        user={user}
                        onLogout={logout}
                        onClose={() => setIsOpen(false)}
                    />
                </>
            )}
        </header>
    );
}
