import { Stack } from "@chakra-ui/react";
import { Suspense } from "react";

import TechnologiesTable from "@/ui/components/technologies-table/TechnologiesTable";
import TechnologiesTableSkeleton from "@/ui/components/technologies-table/TechnologiesTableSkeleton";
import { getSearchParam } from "@/utils/search-params";

import { HomeProps } from "./_home/homeProps";

export default async function Home({ searchParams }: HomeProps) {
    const searchParameters = await searchParams;
    const page = getSearchParam(searchParameters, "page") ?? "1";

    return (
        <Stack width={"full"} gap={5} padding={8}>
            <Suspense
                key={page}
                fallback={<TechnologiesTableSkeleton rows={10} />}
            >
                <TechnologiesTable page={parseInt(page)} />
            </Suspense>
        </Stack>
    );
}
