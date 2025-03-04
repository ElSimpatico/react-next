import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { getFormatter, getTranslations } from "next-intl/server";
import React from "react";

import { TechnologyColumns } from "@/constants/columns";
import { Technology } from "@/models/Technology";
import { TableColumns } from "@/types/DataTable";

export default async function getTechnologyColumns(): Promise<
    TableColumns<Technology>
> {
    const t = await getTranslations();
    const { dateTime } = await getFormatter();
    return {
        [TechnologyColumns.NAME]: {
            header: () => <span>{t("home_datatable_header_NAME")}</span>,
            cell: ({ data }) => (
                <Flex alignItems={"center"} gap={5}>
                    <Image
                        src={data.logoImageUrl}
                        alt={data.name}
                        width={72}
                        height={72}
                        unoptimized
                    />
                    {data.name}
                </Flex>
            ),
        },
        [TechnologyColumns.CREATOR]: {
            header: () => <span>{t("home_datatable_header_CREATOR")}</span>,
            cell: ({ data }) => <span>{data.creator}</span>,
        },
        [TechnologyColumns.DATE]: {
            header: () => <span>{t("home_datatable_header_DATE")}</span>,
            cell: ({ data }) => (
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
}
