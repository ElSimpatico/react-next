"use client";

import { useCallback, useEffect } from "react";

import { ENDPOINTS } from "@/constants/endpoints";
import { useAuth } from "@/context/AuthProvider";
import useFetch from "@/hooks/useFetch";
import AuthForm from "@/ui/components/authForm/AuthForm";
import { AuthFormFieds as AuthFormType } from "@/ui/components/authForm/AuthFormProps";

export default function Login() {
    const { login } = useAuth();
    const { error, isLoading, success, data, post } = useFetch<{
        user: { email: string };
    }>(ENDPOINTS.LOGIN);

    const onSubmitHanlder = useCallback(
        (values: AuthFormType) => {
            post(values);
        },
        [post],
    );

    useEffect(() => {
        if (success && data) {
            login(data.user);
        }
    }, [success, data, login]);

    return (
        <AuthForm
            type="login"
            onSubmit={onSubmitHanlder}
            error={error ?? undefined}
            loading={isLoading}
        />
    );
}
