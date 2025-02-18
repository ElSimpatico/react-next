"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import { ENDPOINTS } from "@/constants/endpoints";
import { ROUTES } from "@/constants/routes";
import useFetch from "@/hooks/useFetch";
import AuthForm from "@/ui/components/authForm/AuthForm";
import { AuthFormFieds as AuthFormType } from "@/ui/components/authForm/AuthFormProps";

export default function Register() {
    const router = useRouter();

    const { isLoading, success, error, data, post } = useFetch(
        ENDPOINTS.REGISTER,
    );

    const onSubmitHanlder = useCallback(
        (values: AuthFormType) => {
            post(values);
        },
        [post],
    );

    useEffect(() => {
        if (success && data) {
            router.push(ROUTES.LOGIN);
        }
    }, [data, router, success]);

    return (
        <AuthForm
            type="register"
            onSubmit={onSubmitHanlder}
            error={error ?? undefined}
            loading={isLoading}
        />
    );
}
