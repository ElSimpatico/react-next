import { ReactNode } from "react";

interface CellTableProps<T> {
    data: T;
}

export interface DataTableColumn<T> {
    header: () => ReactNode;
    cell: (props: CellTableProps<T>) => ReactNode;
}

export type TableColumns<T> = Record<string, DataTableColumn<T>>;
