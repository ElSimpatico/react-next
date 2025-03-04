import { CommonProps } from "@/types/CommonProps";
import { TableColumns } from "@/types/DataTable";

export interface DataTableProps<T> extends CommonProps {
    data: Array<T>;
    columns: TableColumns<T>;
    getRowId: (data: T) => string;
    rowHeight?: number;
}
