import { getTranslations } from "next-intl/server";

import TechnologyHeader from "@/app/[locale]/(detail)/_components/technology-header/TechnologyHeader";
import { CommonProps } from "@/app/[locale]/(detail)/_types/CommonProps";
import { Entities } from "@/constants/entities";
import { Technology } from "@/models/Technology";

export default async function Header({ entity, promise }: CommonProps) {
    switch (entity) {
        case Entities.TECHNOLOGIES:
            return (
                <TechnologyHeader promise={promise as Promise<Technology>} />
            );
        default:
            return (await getTranslations())("shared_empty_content");
    }
}
