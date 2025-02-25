import { clsx } from "clsx";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

import { Link, usePathname } from "@/i18n/routing";

import { NavbarProps } from "./navbarProps";

import styles from "./navbar.module.scss";

export default function Navbar({ links, vertical }: NavbarProps) {
    const pathname = usePathname();
    const t = useTranslations();

    const classActive = styles["navbar__list-item--active"];

    const classnameRoot = useMemo(() => {
        const listVertical = styles["navbar--vertical"];
        return clsx(styles.navbar__list, {
            [listVertical]: vertical,
        });
    }, [vertical]);

    return (
        <ul className={classnameRoot}>
            {links.map((link) => (
                <li
                    key={link.key}
                    className={clsx(styles["navbar__list-item"], {
                        [classActive]:
                            link.key === "home"
                                ? pathname === link.href || pathname === ""
                                : pathname === link.href,
                    })}
                >
                    <Link href={link.href}>{t(link.key)}</Link>
                </li>
            ))}
        </ul>
    );
}
