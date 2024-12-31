"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

import { NavbarProps } from "./navbarProps";

import styles from "./navbar.module.scss";
import { useMemo } from "react";

export default function Navbar({ links, vertical }: NavbarProps) {
    const pathname = usePathname();

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
                    <Link href={link.href}>{link.label}</Link>
                </li>
            ))}
        </ul>
    );
}
