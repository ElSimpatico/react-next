import { clsx } from "clsx";
import { IoIosArrowBack } from "react-icons/io";

import { Link } from "@/i18n/routing";

import { BackButtonProps } from "./BackButtonProps";

import styles from "./BackButton.module.scss";

export default function BackButton({ href, classname }: BackButtonProps) {
    return (
        <Link
            href={href}
            className={clsx(styles.backbutton, {
                [classname ?? ""]: !!classname,
            })}
        >
            <IoIosArrowBack size={"20px"} />
        </Link>
    );
}
