import { CommonProps } from "@/types/CommonProps";

export type AuthFormType = "login" | "register";
export type AuthFormFieds = {
    email: string;
    password: string;
    confirmPassword?: string;
};

export interface AuthFormProps extends CommonProps {
    type: AuthFormType;
    error?: string;
    loading?: boolean;
    onSubmit: (value: AuthFormFieds) => void;
}

export const initAuthForm: AuthFormFieds = {
    email: "",
    password: "",
    confirmPassword: "",
};
