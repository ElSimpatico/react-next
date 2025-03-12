import { getTranslations } from "next-intl/server";

import TechnologyContent from "@/app/[locale]/(detail)/_components/technology-content/TechonologyContent";
import { CommonProps } from "@/app/[locale]/(detail)/_types/CommonProps";
import { Entities } from "@/constants/entities";
import { Technology } from "@/models/Technology";

export default async function Content({ entity, promise }: CommonProps) {
    switch (entity) {
        case Entities.TECHNOLOGIES:
            return (
                <TechnologyContent promise={promise as Promise<Technology>} />
            );
        default:
            return (await getTranslations())("shared_empty_content");
    }
}
