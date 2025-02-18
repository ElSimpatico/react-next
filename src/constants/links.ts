import { NavbarLink } from "@/types/NavbarLink";

import { ROUTES } from "./routes";

export const LINKS: NavbarLink[] = [
    { key: "home", href: ROUTES.ROOT, label: "Home" },
    { key: "about", href: ROUTES.ABOUT, label: "About" },
];
