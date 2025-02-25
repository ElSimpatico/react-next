import { NavbarLink } from "@/types/navbarLink";

import { ROUTES } from "./routes";

export const ROOT_KEY = "shared_navbar_home";

export const LINKS: NavbarLink[] = [
    { key: ROOT_KEY, href: ROUTES.ROOT },
    { key: "shared_navbar_about", href: ROUTES.ABOUT },
];
