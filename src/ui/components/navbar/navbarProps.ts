import { CommonProps } from "@/types/CommonProps";
import { NavbarLink } from "@/types/navbarLink";

export interface NavbarProps extends CommonProps {
    links: NavbarLink[];
    pathname?: string;
    vertical?: boolean;
}
