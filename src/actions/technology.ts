import { Pagination } from "@/interfaces/Pagination";
import { Technology } from "@/models/Technology";
import { TechnologyService } from "@/services/technology";

export async function getTechnologies(
    page: number,
    itemsPerPage: number,
): Promise<{ pagination: Pagination; data: Technology[] }> {
    const technologyService = new TechnologyService();

    const data = await technologyService.getTechnologies(page, itemsPerPage);
    const count = await technologyService.count();

    const nextPage = page + 1;
    const previousPage = page - 1;

    return {
        pagination: {
            page,
            nextPage: nextPage < count ? nextPage : null,
            previousPage: previousPage > 0 ? previousPage : null,
            itemsPerPage,
            totalItems: count,
        },
        data,
    };
}

export async function getTecnology(id: string): Promise<Technology | null> {
    const technologyService = new TechnologyService();

    return await technologyService.getTecnologyById(id);
}
