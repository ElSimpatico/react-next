import React from "react";

import PaginationItem from "@/ui/components/pagination-item/PaginationItem";

import { PginationProps } from "./PaginationProps";

import styles from "./Pagination.module.scss";

export default function Pagination({
    page,
    totalPages,
    previousPage = -1,
    nextPage = -1,
}: PginationProps) {
    return (
        <ul className={styles.pagination}>
            <li key="page_prev">
                <PaginationItem
                    page={previousPage}
                    disabled={page <= 1}
                    type="item-previous"
                />
            </li>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (indexPage) => {
                    return (
                        <li key={`page_${indexPage}`}>
                            <PaginationItem
                                page={indexPage}
                                active={page === indexPage}
                            />
                        </li>
                    );
                },
            )}
            <li key="page_next">
                <PaginationItem
                    page={nextPage}
                    disabled={page >= totalPages}
                    type="item-next"
                />
            </li>
        </ul>
    );
}
