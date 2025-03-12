import { CommonServerProps, SearchParams } from "@/types/CommonProps";

export interface HomeProps extends CommonServerProps {
    searchParams: Promise<SearchParams>;
}
