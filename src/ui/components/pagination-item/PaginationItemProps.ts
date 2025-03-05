import { CommonProps } from "@/types/CommonProps";

export interface PaginationItemProps extends CommonProps {
    page: number;
    disabled?: boolean;
    active?: boolean;
    type?: "item" | "item-previous" | "item-next";
}
