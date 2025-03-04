import {
    Button,
    IconButton,
    Box,
    DrawerBackdrop,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerRoot,
    DrawerFooter,
    AccordionRoot,
    AccordionItem,
    AccordionItemTrigger,
    AccordionItemContent,
    AccordionItemIndicator,
} from "@chakra-ui/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { IoMdClose, IoIosArrowDown } from "react-icons/io";

import { LINKS } from "@/constants/links";
import { CommonProps } from "@/types/CommonProps";

import LanguageSelector from "../language-selector/LanguageSelector";
import Navbar from "../navbar/navbar";

import styles from "./headerMenu.module.scss";
interface HeaderMenuProps extends CommonProps {
    open?: boolean;
    fullWidth?: boolean;
    user: { email: string };
    onLogout: () => void;
    onClose?: () => void;
}

export default function HeaderMenu({
    open,
    fullWidth,
    user,
    onLogout,
    onClose,
}: HeaderMenuProps) {
    const t = useTranslations();

    return (
        <Box className={styles["header-menu"]} w={fullWidth ? "full" : "lg"}>
            <DrawerRoot
                placement="start"
                open={open}
                size="full"
                onInteractOutside={onClose}
            >
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
                        <Navbar links={LINKS} vertical />
                    </DrawerBody>
                    <DrawerFooter>
                        <AccordionRoot collapsible variant={"plain"}>
                            <AccordionItem value="user" key={"user"}>
                                <AccordionItemTrigger cursor={"pointer"}>
                                    {user.email}
                                    <AccordionItemIndicator marginLeft={"auto"}>
                                        <IoIosArrowDown />
                                    </AccordionItemIndicator>
                                </AccordionItemTrigger>
                                <AccordionItemContent>
                                    <div
                                        className={
                                            styles[
                                                "header-menu__user-accordion-content"
                                            ]
                                        }
                                    >
                                        <LanguageSelector
                                            onSelectLanguage={onClose}
                                        />
                                        <Button
                                            variant={"plain"}
                                            color={"red.400"}
                                            onClick={onLogout}
                                        >
                                            {t("shared_logout")}
                                        </Button>
                                    </div>
                                </AccordionItemContent>
                            </AccordionItem>
                        </AccordionRoot>
                    </DrawerFooter>
                </DrawerContent>
            </DrawerRoot>
        </Box>
    );
}
