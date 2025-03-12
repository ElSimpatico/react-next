import { Skeleton } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";

import { CommonProps } from "@/app/[locale]/(detail)/_types/CommonProps";
import { Entities } from "@/constants/entities";

export default async function HeaderSkeleton({
    entity,
}: Pick<CommonProps, "entity">) {
    switch (entity) {
        case Entities.TECHNOLOGIES:
            return <Skeleton width={"300px"} height={"24px"} />;
        default:
            return (await getTranslations())("shared_loading");
    }
}
