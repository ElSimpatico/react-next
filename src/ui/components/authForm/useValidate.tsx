import { useCallback, useMemo, useState } from "react";

import { ValidationRule } from "@/types/Validations";
import { validate } from "@/utils/validations";

import { AuthFormFieds, initAuthForm, AuthFormType } from "./AuthFormProps";
import {
    confirmPasswordValidations,
    emailValidations,
    emailValidationsLogin,
    passwordValidations,
    passwordValidationsLogin,
} from "./validations";

type FieldName = keyof AuthFormFieds;

export default function useValidate(type: AuthFormType) {
    const [errors, setErrors] = useState<AuthFormFieds>(initAuthForm);

    const validations = useMemo((): Record<FieldName, ValidationRule[]> => {
        return {
            email: type === "login" ? emailValidationsLogin : emailValidations,
            password:
                type === "login"
                    ? passwordValidationsLogin
                    : passwordValidations,
            confirmPassword: confirmPasswordValidations,
        };
    }, [type]);

    const hasErrors = useMemo(() => {
        return Object.values(errors).some((value) => value?.length > 0);
    }, [errors]);

    const validateField = useCallback(
        (name: string, value: string, extraValue?: string) => {
            const errorMessage = validate(
                value,
                validations[name as FieldName],
                extraValue,
            );
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: errorMessage ?? "",
            }));
        },
        [validations],
    );

    const validateForm = useCallback(
        (authForm: AuthFormFieds) => {
            const errorEmail = validate(authForm.email, validations.email);
            const errorPassword = validate(
                authForm.password,
                validations.password,
            );
            const errorConfirmPassword =
                type === "register"
                    ? validate(
                          authForm.confirmPassword ?? "",
                          validations.confirmPassword,
                          authForm.password,
                      )
                    : null;

            const newErrors = {
                email: errorEmail ?? "",
                password: errorPassword ?? "",
                confirmPassword: errorConfirmPassword ?? "",
            };

            setErrors((prevErrors) =>
                JSON.stringify(newErrors) !== JSON.stringify(prevErrors)
                    ? newErrors
                    : prevErrors,
            );

            return !errorEmail && !errorPassword && !errorConfirmPassword;
        },
        [
            type,
            validations.confirmPassword,
            validations.email,
            validations.password,
        ],
    );

    return { errors, hasErrors, validateForm, validateField };
}
