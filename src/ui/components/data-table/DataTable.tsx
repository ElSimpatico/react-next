import { Table } from "@chakra-ui/react";
import React from "react";

import { DataTableProps } from "./DataTableProps";

export default function DataTable<T>({
    data,
    columns,
    getRowId,
    rowHeight,
}: DataTableProps<T>) {
    return (
        <Table.Root size="sm" variant="line">
            <Table.Header>
                <Table.Row>
                    {Object.keys(columns).map((columnId) => (
                        <Table.ColumnHeader
                            key={columnId}
                            textTransform={"uppercase"}
                        >
                            {columns[columnId].header()}
                        </Table.ColumnHeader>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {(data ?? []).map((dataItem) => (
                    <Table.Row key={getRowId(dataItem)} height={rowHeight}>
                        {Object.keys(columns).map((columnId) => (
                            <Table.Cell key={`data_table_column_${columnId}`}>
                                {columns[columnId].cell({ data: dataItem })}
                            </Table.Cell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
}
