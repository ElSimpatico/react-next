export type Params = Record<string, unknown>;
export type SearchParams = Record<string, string | string[] | undefined>;

export interface CommonProps {
    testId?: string;
    classname?: string;
}

export interface CommonServerProps {
    params?: Promise<Params>;
    searchParams?: Promise<SearchParams>;
}
