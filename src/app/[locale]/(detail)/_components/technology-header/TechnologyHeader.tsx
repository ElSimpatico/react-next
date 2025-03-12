import { Heading } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";
import { use } from "react";

import { Technology } from "@/models/Technology";

export default function TechnologyHeader({
    promise,
}: {
    promise: Promise<Technology>;
}) {
    const technology = use(promise);

    const t = use(getTranslations());

    return (
        <Heading>
            {t("detail_header_title_technologies", { name: technology.name })}
        </Heading>
    );
}
