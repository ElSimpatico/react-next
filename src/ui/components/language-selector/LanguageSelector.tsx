import {
    MenuRoot,
    MenuTrigger,
    Button,
    MenuContent,
    MenuItem,
} from "@chakra-ui/react";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";

import { LOCALES } from "@/i18n/locales";
import { usePathname, Link } from "@/i18n/routing";
import { CommonProps } from "@/types/CommonProps";

interface LanguageSelectorProps extends CommonProps {
    onSelectLanguage?: () => void;
}

export default function LanguageSelector({
    onSelectLanguage,
}: LanguageSelectorProps) {
    const locale = useLocale();
    const pathname = usePathname();
    const t = useTranslations();
    return (
        <MenuRoot>
            <MenuTrigger asChild>
                <Button variant={"ghost"}>
                    {t(`languages_${locale}`)}
                    <IoIosArrowDown size={"1x"} />
                </Button>
            </MenuTrigger>
            <MenuContent position={"absolute"}>
                {LOCALES.map((code) => (
                    <MenuItem
                        key={code}
                        value={code}
                        disabled={code === locale}
                    >
                        <Link
                            href={pathname}
                            locale={code}
                            onClick={onSelectLanguage}
                        >
                            {t(`languages_${code}`)}
                        </Link>
                    </MenuItem>
                ))}
            </MenuContent>
        </MenuRoot>
    );
}
