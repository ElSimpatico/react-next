import { CommonProps } from "@/types/CommonProps";

import styles from "./footer.module.scss";

export default function Footer({ testId }: CommonProps) {
    return (
        <footer data-testid={testId} className={styles.footer}>
            <p>Developed for Aaron Velasco Lopez</p>
        </footer>
    );
}
