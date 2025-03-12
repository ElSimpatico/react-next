import { Separator, Skeleton } from "@chakra-ui/react";

import styles from "./TecnologyContent.module.scss";

export default function TechnologyContentSkeleton() {
    return (
        <div className={styles["technology-content"]}>
            <section
                className={`${styles["technology-content__section"]} ${styles["technology-content__section-summary"]}`}
            >
                <Skeleton height={"24px"} />
                <div className={styles["technology-content__image"]}>
                    <Skeleton width={150} height={200} />
                </div>
                <Skeleton height={"24px"} />
            </section>
            <Separator orientation={"vertical"} />
            <section className={styles["technology-content__section"]}>
                {[...new Array(3)].map((_, index) => (
                    <>
                        <div
                            key={index}
                            className={styles["technology-content__subsection"]}
                        >
                            <div
                                className={
                                    styles[
                                        "technology-content__subsection-title"
                                    ]
                                }
                            >
                                <Skeleton width={"200px"} height={"24px"} />
                            </div>
                            <div
                                className={
                                    styles[
                                        "technology-content__subsection-text"
                                    ]
                                }
                            >
                                <Skeleton height={"16px"} />
                            </div>
                            <div
                                className={
                                    styles[
                                        "technology-content__subsection-text"
                                    ]
                                }
                            >
                                <Skeleton height={"16px"} />
                            </div>
                            <div
                                className={
                                    styles[
                                        "technology-content__subsection-text"
                                    ]
                                }
                            >
                                <Skeleton height={"16px"} />
                            </div>
                        </div>
                        {index < 3 - 1 && (
                            <Separator
                                className={
                                    styles["technology-content__separator"]
                                }
                            />
                        )}
                    </>
                ))}
            </section>
        </div>
    );
}
