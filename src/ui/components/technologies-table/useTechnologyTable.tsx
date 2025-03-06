import { Text, Skeleton } from "@chakra-ui/react";
import { useTranslations, useFormatter } from "next-intl";
import { useMemo } from "react";

import { TechnologyColumns } from "@/constants/columns";
import { Technology } from "@/models/Technology";
import { TableColumns } from "@/types/DataTable";

import NameCell from "./name-cell/NameCell";
import NameCellSkeleton from "./name-cell/NameCellSkeleton";

export default function useTechnologyTable({ loading }: { loading?: boolean }) {
    const t = useTranslations();
    const { dateTime } = useFormatter();

    const columns: TableColumns<Technology> = useMemo(() => {
        return {
            [TechnologyColumns.NAME]: {
                header: () => <span>{t("home_datatable_header_NAME")}</span>,
                cell: ({ data }) =>
                    loading ? <NameCellSkeleton /> : <NameCell {...data} />,
            },
            [TechnologyColumns.CREATOR]: {
                header: () => <span>{t("home_datatable_header_CREATOR")}</span>,
                cell: ({ data }) =>
                    loading ? (
                        <Skeleton width={"200px"} height={"24px"} />
                    ) : (
                        <span>{data.creator}</span>
                    ),
            },
            [TechnologyColumns.DATE]: {
                header: () => <span>{t("home_datatable_header_DATE")}</span>,
                cell: ({ data }) =>
                    loading ? (
                        <Skeleton width={"200px"} height={"24px"} />
                    ) : (
                        <Text textTransform={"uppercase"}>
                            {dateTime(data.releaseDate, {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </Text>
                    ),
            },
        };
    }, [dateTime, loading, t]);

    return { columns, t };
}
