import {
    DEFAULT_PAGINATION_ITEMS_PER_PAGE,
    DEFAULT_PAGINATION_PAGE,
} from "@/constants/pagination";
import prisma from "@/lib/prisma";
import { Technology } from "@/models/Technology";

export class TechnologyService {
    async count(): Promise<number> {
        return await prisma.technology.count();
    }

    async getTechnologies(
        page: number = DEFAULT_PAGINATION_PAGE,
        itemsPerPage: number = DEFAULT_PAGINATION_ITEMS_PER_PAGE,
    ): Promise<Technology[]> {
        const skip = (page - 1) * itemsPerPage;

        const technology = await prisma.technology.findMany({
            skip,
            take: itemsPerPage,
            orderBy: {
                releaseDate: "desc",
            },
        });

        return technology;
    }

    async getTecnologyById(id: string): Promise<Technology | null> {
        const technology = await prisma.technology.findUnique({
            where: {
                id,
            },
        });

        return technology;
    }
}
