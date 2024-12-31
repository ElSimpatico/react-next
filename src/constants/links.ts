import { NavbarLink } from "@/types/navbarLink";

import { ROUTES } from "./routes";

export const LINKS: NavbarLink[] = [
    { key: "home", href: ROUTES.HOME, label: "Home" },
    { key: "about", href: ROUTES.ABOUT, label: "About" },
];
