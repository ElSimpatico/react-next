import { Heading } from "@chakra-ui/react";
import { useMemo } from "react";

import { Technology } from "@/models/Technology";
import { CommonProps } from "@/types/CommonProps";
import DataTable from "@/ui/components/data-table/DataTable";

import useTechnologyTable from "./useTechnologyTable";

interface TechnologiesTableSkeletonProps extends CommonProps {
    rows: number;
}

export default function TechnologiesTableSkeleton({
    rows,
}: TechnologiesTableSkeletonProps) {
    const { columns, t } = useTechnologyTable({ loading: true });

    const mockData = useMemo(() => {
        return [...Array(rows)].map((_, index) => ({
            id: `skeleton-row_${index}`,
        }));
    }, [rows]);

    return (
        <>
            <Heading size={"xl"}>
                {t("home_title_technologies", {
                    count: 0,
                })}
            </Heading>
            <DataTable
                data={mockData as Technology[]}
                columns={columns}
                getRowId={(data) => data.id}
                rowHeight={88}
            />
        </>
    );
}
