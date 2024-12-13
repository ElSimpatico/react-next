import { CommonProps } from "@/types/commonProps";
import { NavbarLink } from "@/types/navbarLink";

export interface NavbarProps extends CommonProps {
    links: NavbarLink[];
}