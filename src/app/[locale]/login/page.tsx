"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect } from "react";

import { ENDPOINTS } from "@/constants/endpoints";
import { useAuth } from "@/context/AuthProvider";
import useFetch from "@/hooks/useFetch";
import { User } from "@/models/User";
import AuthForm from "@/ui/components/authForm/AuthForm";
import { AuthFormFieds as AuthFormType } from "@/ui/components/authForm/AuthFormProps";

export default function Login() {
    const { login } = useAuth();
    const t = useTranslations();
    const {
        error,
        isLoading,
        success,
        data: user,
        post,
    } = useFetch<User>(ENDPOINTS.LOGIN);

    const onSubmitHanlder = useCallback(
        (values: AuthFormType) => {
            post(values);
        },
        [post],
    );

    useEffect(() => {
        if (success && user) {
            login(user);
        }
    }, [success, user, login]);

    return (
        <AuthForm
            type="login"
            onSubmit={onSubmitHanlder}
            error={error ? t(error.id) : undefined}
            loading={isLoading}
        />
    );
}
