import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

import { LOCALES, DEFAULT_LOCALE } from "./locales";

export const routing = defineRouting({
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
