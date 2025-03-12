import { Suspense } from "react";

import { getTecnology } from "@/actions/technology";
import Content from "@/app/[locale]/(detail)/_components/content/Content";
import ContentSkeleton from "@/app/[locale]/(detail)/_components/content/ContentSkeleton";
import Header from "@/app/[locale]/(detail)/_components/header/Header";
import HeaderSkeleton from "@/app/[locale]/(detail)/_components/header/HeaderSkeleton";
import { Entities } from "@/constants/entities";
import { ROUTES } from "@/constants/routes";
import { CommonServerProps } from "@/types/CommonProps";
import BackButton from "@/ui/components/back-button/BackButton";

type DetailPageProps = CommonServerProps;

import styles from "./detail.module.scss";

async function getEntityDetail(entity: string, id: string): Promise<unknown> {
    switch (entity) {
        case Entities.TECHNOLOGIES:
            return getTecnology(id);
        default:
            return null;
    }
}

export default async function Detail({ params }: DetailPageProps) {
    const { entity = "", id = "" } = await params!;

    const entityPromise = getEntityDetail(entity as string, id as string);
    return (
        <>
            <header className={styles["detail-page__header"]}>
                <BackButton
                    classname={styles["detail-page__back-button"]}
                    href={ROUTES.ROOT}
                />
                <Suspense
                    fallback={<HeaderSkeleton entity={entity as string} />}
                >
                    <Header entity={entity as string} promise={entityPromise} />
                </Suspense>
            </header>
            <main>
                <Suspense
                    fallback={<ContentSkeleton entity={entity as string} />}
                >
                    <Content
                        entity={entity as string}
                        promise={entityPromise}
                    />
                </Suspense>
            </main>
        </>
    );
}
