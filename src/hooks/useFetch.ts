import { useCallback, useState } from "react";

import { ErrorResponse, JSONResponse } from "@/interfaces/Response";

export default function useFetch<T>(url: string) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<ErrorResponse | null>(null);
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

                const jsonResponse = (await response
                    .json()
                    .catch(() => null)) as JSONResponse<T>;

                if (!response.ok) {
                    setError(
                        jsonResponse?.error ?? {
                            id: "unknown",
                            message: "An unexpected error occurred",
                        },
                    );
                    setSuccess(false);
                    return;
                }

                setData(jsonResponse.data);
                setSuccess(true);
            } catch (err) {
                console.error("Fetch Error:", err);
                setError({
                    id: "network_error",
                    message: "Network error or server unreachable",
                });
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
