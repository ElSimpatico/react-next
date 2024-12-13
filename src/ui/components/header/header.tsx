import Image from "next/image";

import { LINKS } from "@/constants/links";
import Navbar from "@/ui/components/navbar/navbar";
import { CommonProps } from "@/types/commonProps";

import styles from "./header.module.scss";

export default function Header({ testId }: CommonProps) {
    return (
        <header data-testid={testId} className={styles.header}>
            <Image
                className={styles.logo}
                src="/next.svg"
                alt="Next.js logo"
                layout="responsive"
                width={16}
                height={9}
                priority
            />
            <Navbar links={LINKS} />
        </header>
    );
}
