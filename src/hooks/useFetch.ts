import { useCallback, useState } from "react";

export default function useFetch<T>(url: string) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);

    const request = useCallback(
        async ({ headers, ...restOptions }: RequestInit) => {
            setError(null);
            setIsLoading(true);
            setSuccess(false);
            try {
                const response = await fetch(url, {
                    headers: { "Content-Type": "application/json", ...headers },
                    ...restOptions,
                });

                const data = await response.json().catch(() => null);

                if (!response.ok) {
                    throw new Error(
                        data?.error ?? response.statusText ?? "Unknokwn error",
                    );
                }

                setData(data);
                setSuccess(true);
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "Unknokwn error";
                console.error("Fetch Error: ", errorMessage);
                setError(errorMessage);
                setSuccess(false);
            } finally {
                setIsLoading(false);
            }
        },
        [url],
    );

    const get = useCallback(() => {
        request({ method: "GET" });
    }, [request]);

    const post = useCallback(
        (body?: unknown) => {
            request({
                method: "POST",
                body: body ? JSON.stringify(body) : null,
            });
        },
        [request],
    );

    return { isLoading, error, success, data, get, post };
}
