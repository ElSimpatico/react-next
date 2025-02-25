export class CustomError extends Error {
    public id: string;
    public code: number;

    constructor(message: string, id: string, code: number) {
        super(message);
        this.id = id;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}
