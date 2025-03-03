export interface Pagination {
    page: number;
    nextPage: number | null;
    previousPage: number | null;
    itemsPerPage: number;
    totalItems: number;
}
