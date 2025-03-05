import { getTranslations } from "next-intl/server";

import { CommonProps } from "@/types/CommonProps";

import styles from "./Footer.module.scss";

export default async function Footer({ testId }: CommonProps) {
    const t = await getTranslations();
    return (
        <footer data-testid={testId} className={styles.footer}>
            <p>{t("shared_footer", { name: "Aarón Velasco López" })}</p>
        </footer>
    );
}
