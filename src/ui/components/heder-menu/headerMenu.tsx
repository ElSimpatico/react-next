import Image from "next/image";

import { IconButton, Box } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";

import { CommonProps } from "@/types/commonProps";

import {
    DrawerBackdrop,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerRoot,
} from "@chakra-ui/react";

import styles from "./headerMenu.module.scss";
import Navbar from "../navbar/navbar";
import { LINKS } from "@/constants/links";

interface HeaderMenuProps extends CommonProps {
    open?: boolean;
    fullWidth?: boolean;
    onClose?: () => void;
}

export default function HeaderMenu({
    open,
    fullWidth,
    onClose,
}: HeaderMenuProps) {
    return (
        <Box className={styles["header-menu"]} w={fullWidth ? "full" : "lg"}>
            <DrawerRoot placement="start" open={open} size="full">
                <DrawerBackdrop />
                <DrawerContent>
                    <DrawerHeader
                        className={styles["header-menu__drawer-header"]}
                    >
                        <Image
                            src="/next.svg"
                            alt="Next.js logo"
                            layout="responsive"
                            width={16}
                            height={9}
                            priority
                        />
                        <IconButton
                            className={styles["header-menu__drawer-close"]}
                            aria-label="close menu"
                            variant="ghost"
                            size="md"
                            onClick={onClose}
                        >
                            <IoMdClose />
                        </IconButton>
                    </DrawerHeader>
                    <DrawerBody>
                        <Navbar links={LINKS} vertical></Navbar>
                    </DrawerBody>
                </DrawerContent>
            </DrawerRoot>
        </Box>
    );
}
