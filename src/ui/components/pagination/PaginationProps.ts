import { CommonProps } from "@/types/CommonProps";

export interface PginationProps extends CommonProps {
    page: number;
    totalPages: number;
    previousPage?: number;
    nextPage?: number;
}
