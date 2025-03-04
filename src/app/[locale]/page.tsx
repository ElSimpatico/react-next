import { Heading, Stack, Table, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { getFormatter } from "next-intl/server";

import { getTechnologies } from "@/actions/technology";
import { CommonServerProps, SearchParams } from "@/types/CommonProps";
import Pagination from "@/ui/components/pagination/Pagination";

interface HomeProps extends CommonServerProps {
    searchParams: Promise<SearchParams>;
}

function getSearchParam(params: SearchParams, key: string): string | undefined {
    const param = params[key];
    if (Array.isArray(param)) {
        return param[0];
    }
    return param;
}

export default async function Home({ searchParams }: HomeProps) {
    const searchParameters = await searchParams;
    const formatter = await getFormatter();

    const page = getSearchParam(searchParameters, "page") ?? "1";

    const { data, pagination } = await getTechnologies(parseInt(page), 10);

    const totalPages = Math.ceil(
        pagination.totalItems / pagination.itemsPerPage,
    );

    return (
        <div>
            <Stack width={"full"} gap={5} padding={8}>
                <Heading
                    size={"xl"}
                >{`Listado de tecnologias (${pagination.totalItems})`}</Heading>
                <Table.Root size="sm" variant="outline">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Tecnologia</Table.ColumnHeader>
                            <Table.ColumnHeader>Creador</Table.ColumnHeader>
                            <Table.ColumnHeader>
                                Fecha de lanzamiento
                            </Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {(data ?? []).map((technology) => (
                            <Table.Row key={technology.id} height={"80px"}>
                                <Table.Cell>
                                    <Flex alignItems={"center"} gap={5}>
                                        <Image
                                            src={technology.logoImageUrl}
                                            alt={technology.name}
                                            width={72}
                                            height={72}
                                            unoptimized
                                        />
                                        {technology.name}
                                    </Flex>
                                </Table.Cell>
                                <Table.Cell>{technology.creator}</Table.Cell>
                                <Table.Cell textTransform={"uppercase"}>
                                    {formatter.dateTime(
                                        technology.releaseDate,
                                        {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        },
                                    )}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
                <Pagination
                    page={pagination.page}
                    totalPages={totalPages}
                    previousPage={pagination.previousPage ?? undefined}
                    nextPage={pagination.nextPage ?? undefined}
                />
            </Stack>
        </div>
    );
}
