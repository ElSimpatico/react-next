import { Flex, Heading, Link, Separator, Tag, Text } from "@chakra-ui/react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { use } from "react";
import { LuExternalLink } from "react-icons/lu";

import { Technology } from "@/models/Technology";

import styles from "./TecnologyContent.module.scss";

export default function TechnologyContent({
    promise,
}: {
    promise: Promise<Technology>;
}) {
    const technology = use(promise);

    const t = use(getTranslations());

    return (
        <div className={styles["technology-content"]}>
            <section
                className={`${styles["technology-content__section"]} ${styles["technology-content__section-summary"]}`}
            >
                <Tag.Root variant={"outline"} size={"lg"}>
                    <Tag.Label textTransform={"uppercase"}>
                        {technology.creator}
                    </Tag.Label>
                </Tag.Root>
                <div className={styles["technology-content__image"]}>
                    <Image
                        src={technology.logoImageUrl}
                        alt={technology.name}
                        width={150}
                        height={200}
                        unoptimized
                    />
                </div>
                <Flex alignItems={"center"} gapX={"16px"}>
                    <Link variant={"underline"} href={technology.website}>
                        {t("detail_content_official_website")}
                    </Link>
                    <LuExternalLink />
                </Flex>
            </section>
            <Separator orientation={"vertical"} />
            <section className={styles["technology-content__section"]}>
                <div className={styles["technology-content__subsection"]}>
                    <Heading
                        className={
                            styles["technology-content__subsection-title"]
                        }
                    >
                        {t("detail_content_description")}
                    </Heading>
                    <Text
                        className={
                            styles["technology-content__subsection-text"]
                        }
                    >
                        {technology.description}
                    </Text>
                </div>
                <Separator
                    className={styles["technology-content__separator"]}
                />
                <div className={styles["technology-content__subsection"]}>
                    <Heading
                        className={
                            styles["technology-content__subsection-title"]
                        }
                    >
                        {t("detail_content_features")}
                    </Heading>
                    {technology.mainFeatures.map((feature, index) => (
                        <Text
                            className={
                                styles["technology-content__subsection-text"]
                            }
                            key={index}
                        >
                            {feature}
                        </Text>
                    ))}
                </div>
                <Separator
                    className={styles["technology-content__separator"]}
                />
                <div className={styles["technology-content__subsection"]}>
                    <Heading
                        className={
                            styles["technology-content__subsection-title"]
                        }
                    >
                        {t("detail_content_use_cases")}
                    </Heading>
                    {technology.useCases.map((useCase, index) => (
                        <Text
                            className={
                                styles["technology-content__subsection-text"]
                            }
                            key={index}
                        >
                            {useCase}
                        </Text>
                    ))}
                </div>
            </section>
        </div>
    );
}
