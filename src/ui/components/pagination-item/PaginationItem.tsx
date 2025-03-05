"use client";
import { Button, IconButton } from "@chakra-ui/react";
import React, { useCallback, MouseEvent, useMemo } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { Link, usePathname } from "@/i18n/routing";

import { PaginationItemProps } from "./PaginationItemProps";

export default function PaginationItem({
    page,
    disabled,
    active,
    type = "item",
}: PaginationItemProps) {
    const pathname = usePathname();
    const variant = active ? "solid" : "outline";
    const isDisabled = disabled || active;
    const Component = type === "item" ? Button : IconButton;

    const onClickHandler = useCallback(
        (event: MouseEvent<HTMLAnchorElement>) => {
            if (disabled) {
                event.preventDefault();
            }
        },
        [disabled],
    );

    const href = useMemo(() => {
        if (disabled) {
            return "#";
        }

        return {
            pathname: pathname,
            query: { page },
        };
    }, [disabled, page, pathname]);

    return (
        <Component asChild variant={variant} disabled={isDisabled}>
            <Link href={href} onClick={onClickHandler}>
                {type === "item" && page}
                {type === "item-previous" && <IoIosArrowBack />}
                {type === "item-next" && <IoIosArrowForward />}
            </Link>
        </Component>
    );
}
