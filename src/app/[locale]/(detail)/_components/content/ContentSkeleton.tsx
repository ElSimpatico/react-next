import { getTranslations } from "next-intl/server";

import TechnologyContentSkeleton from "@/app/[locale]/(detail)/_components/technology-content/TechnologyContentSkeleton";
import { CommonProps } from "@/app/[locale]/(detail)/_types/CommonProps";
import { Entities } from "@/constants/entities";

export default async function ContentSkeleton({
    entity,
}: Pick<CommonProps, "entity">) {
    switch (entity) {
        case Entities.TECHNOLOGIES:
            return <TechnologyContentSkeleton />;
        default:
            return (await getTranslations())("shared_loading");
    }
}
