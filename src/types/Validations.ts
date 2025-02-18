export enum Validation {
    REQUIRED = "required",
    REGEX = "regex",
    MIN_LENGHT = "minLenght",
    CUSTOM = "custom",
}

type ValidationBase<T> = {
    message: string;
    data: T;
};

type ValidationRequired = Omit<ValidationBase<unknown>, "data"> & {
    type: Validation.REQUIRED;
};

type ValidationRegex = ValidationBase<string | RegExp> & {
    type: Validation.REGEX;
};

type ValidationMinLenght = ValidationBase<number> & {
    type: Validation.MIN_LENGHT;
};

type ValidationCustom = Omit<ValidationBase<unknown>, "data"> & {
    type: Validation.CUSTOM;
    validate: (...args: unknown[]) => boolean;
};

export type ValidationRule =
    | ValidationRequired
    | ValidationRegex
    | ValidationMinLenght
    | ValidationCustom;
