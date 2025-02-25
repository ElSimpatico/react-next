"use client";
import { useTranslations } from "next-intl";
import { useCallback, useEffect } from "react";

import { ENDPOINTS } from "@/constants/endpoints";
import { ROUTES } from "@/constants/routes";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "@/i18n/routing";
import { User } from "@/models/User";
import AuthForm from "@/ui/components/authForm/AuthForm";
import { AuthFormFieds as AuthFormType } from "@/ui/components/authForm/AuthFormProps";

export default function Register() {
    const router = useRouter();
    const t = useTranslations();

    const { isLoading, success, error, data, post } = useFetch<User>(
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
            error={error ? t(error.id) : undefined}
            loading={isLoading}
        />
    );
}
