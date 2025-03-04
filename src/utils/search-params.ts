import { SearchParams } from "@/types/CommonProps";

export function getSearchParam(
    params: SearchParams,
    key: string,
): string | undefined {
    const param = params[key];
    if (Array.isArray(param)) {
        return param[0];
    }
    return param;
}
