import { Heading, Stack } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";

import { getTechnologies } from "@/actions/technology";
import DataTable from "@/ui/components/data-table/DataTable";
import Pagination from "@/ui/components/pagination/Pagination";
import { getSearchParam } from "@/utils/search-params";

import getTechnologyColumns from "./_home/columns";
import { HomeProps } from "./_home/homeProps";

export default async function Home({ searchParams }: HomeProps) {
    const searchParameters = await searchParams;
    const page = getSearchParam(searchParameters, "page") ?? "1";

    const { data, pagination } = await getTechnologies(parseInt(page), 10);

    const totalPages = Math.ceil(
        pagination.totalItems / pagination.itemsPerPage,
    );

    const columns = await getTechnologyColumns();

    const t = await getTranslations();

    return (
        <Stack width={"full"} gap={5} padding={8}>
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
        </Stack>
    );
}
