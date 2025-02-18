import { Validation, ValidationRule } from "@/types/Validations";

export const emailValidations: ValidationRule[] = [
    {
        type: Validation.REQUIRED,
        message: "El campo email es requerido",
    },
    {
        type: Validation.REGEX,
        message:
            "El campo email debe tener el siguiente formato 'usuario@dominio.com'",
        data: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
];

export const emailValidationsLogin: ValidationRule[] = [
    {
        type: Validation.REQUIRED,
        message: "El campo email es requerido",
    },
];

export const passwordValidations: ValidationRule[] = [
    {
        type: Validation.REQUIRED,
        message: "El campo contraseña es requerido",
    },
    {
        type: Validation.MIN_LENGHT,
        message: "El campo contraseña debe tener al menos 8 caracteres",
        data: 8,
    },
];

export const passwordValidationsLogin: ValidationRule[] = [
    {
        type: Validation.REQUIRED,
        message: "El campo contraseña es requerido",
    },
];

export const confirmPasswordValidations: ValidationRule[] = [
    {
        type: Validation.REQUIRED,
        message: "El campo confirmar contraseña es requerido",
    },
    {
        type: Validation.CUSTOM,
        message: "El campo confirmar contraseña no coincide",
        validate: (value, password) => value === password,
    },
];
