import { Heading } from "@chakra-ui/react";
import { use } from "react";

import { getTechnologies } from "@/actions/technology";
import DataTable from "@/ui/components/data-table/DataTable";
import Pagination from "@/ui/components/pagination/Pagination";

import { TechnologiesTableProps } from "./TecchnologiesTableProps";
import useTechnologyTable from "./useTechnologyTable";

export default function TechnologiesTable({ page }: TechnologiesTableProps) {
    const { data, pagination } = use(getTechnologies(page, 10));

    const { columns, t } = useTechnologyTable({});

    const totalPages = Math.ceil(
        pagination.totalItems / pagination.itemsPerPage,
    );

    return (
        <>
            <Heading size={"xl"}>
                {t("home_title_technologies", {
                    count: pagination.totalItems,
                })}
            </Heading>
            <DataTable
                data={data}
                columns={columns}
                getRowId={(data) => data.id}
                rowHeight={88}
            />
            <Pagination
                page={pagination.page}
                totalPages={totalPages}
                previousPage={pagination.previousPage ?? undefined}
                nextPage={pagination.nextPage ?? undefined}
            />
        </>
    );
}
