import { CommonProps } from "@/types/CommonProps";
import { NavbarLink } from "@/types/Navbar";

export interface NavbarProps extends CommonProps {
    links: NavbarLink[];
    pathname?: string;
    vertical?: boolean;
    onClickLink?: () => void;
}
