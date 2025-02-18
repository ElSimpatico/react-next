import { CommonProps } from "@/types/CommonProps";
import { NavbarLink } from "@/types/NavbarLink";

export interface NavbarProps extends CommonProps {
    links: NavbarLink[];
    vertical?: boolean;
}
