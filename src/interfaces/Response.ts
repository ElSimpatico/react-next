export interface ErrorResponse {
    id: string;
    message: string;
}

export interface JSONResponse<T> {
    data: T;
    error?: ErrorResponse;
}
