"use client";
import { Button, IconButton } from "@chakra-ui/react";
import React, { useCallback, MouseEvent } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { CommonProps } from "@/types/CommonProps";

interface PaginationItemProps extends CommonProps {
    page: number;
    disabled?: boolean;
    active?: boolean;
    type?: "item" | "item-previous" | "item-next";
}

export default function PaginationItem({
    page,
    disabled,
    active,
    type = "item",
}: PaginationItemProps) {
    const href = disabled ? "#" : `?page=${page}`;
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

    return (
        <Component asChild variant={variant} disabled={isDisabled}>
            <a href={href} onClick={onClickHandler}>
                {type === "item" && page}
                {type === "item-previous" && <IoIosArrowBack />}
                {type === "item-next" && <IoIosArrowForward />}
            </a>
        </Component>
    );
}
