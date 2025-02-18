import { Validation, ValidationRule } from "@/types/Validations";

function validateRule<T>(
    value: T,
    rule: ValidationRule,
    customArg?: unknown,
): boolean {
    switch (rule.type) {
        case Validation.REQUIRED:
            return validateRequired(value);
        case Validation.MIN_LENGHT:
            return validateMinLength(value, rule.data);
        case Validation.REGEX:
            return validateRegex(value, rule.data);
        case Validation.CUSTOM:
            return rule.validate(value, customArg);
    }
}

export function validate<T>(
    value: T,
    rules: ValidationRule[],
    customArg?: unknown,
): string | null {
    const koRule = rules.find((rule) => !validateRule(value, rule, customArg));
    return koRule?.message ?? null;
}

export function validateRequired<T>(value: T): boolean {
    if (value === null && value === undefined) {
        return false;
    }

    if (typeof value === "string") {
        return value.trim() !== "";
    }

    if (typeof value === "number") {
        return !isNaN(value);
    }

    return true;
}

export function validateMinLength<T>(value: T, min: number): boolean {
    if (typeof value === "string" || Array.isArray(value)) {
        return value.length >= min;
    }

    return false;
}

export function validateRegex<T>(value: T, regex: string | RegExp): boolean {
    return new RegExp(regex).test(value as string);
}
