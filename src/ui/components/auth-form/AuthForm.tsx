import {
    Box,
    Button,
    Heading,
    Input,
    Alert,
    CloseButton,
    Link as ChakraLink,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import React, {
    ChangeEvent,
    FormEvent,
    useCallback,
    useEffect,
    useState,
} from "react";

import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/routing";
import FormField from "@/ui/components/formField/FormField";

import { AuthFormProps, AuthFormFieds, initAuthForm } from "./AuthFormProps";
import useValidate from "./useValidate";

export default function AuthForm({
    onSubmit,
    type,
    error,
    loading,
}: AuthFormProps) {
    const t = useTranslations();
    const [showGlobalError, setShowGlobalError] = useState<boolean>();
    const { errors, hasErrors, validateForm, validateField } =
        useValidate(type);
    const [authForm, setAuthForm] = useState<AuthFormFieds>(initAuthForm);

    const onSubmitHanlder = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const isValid = validateForm(authForm);
            if (isValid) {
                onSubmit(authForm);
            }
        },
        [authForm, onSubmit, validateForm],
    );

    const onChangeHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setAuthForm((prevAuthForm) => {
                const nextAuthForm = { ...prevAuthForm, [name]: value };
                validateField(name, value, nextAuthForm.password);
                return nextAuthForm;
            });
        },
        [validateField],
    );

    useEffect(() => {
        if (error) {
            setShowGlobalError(true);
        }
    }, [error]);

    return (
        <>
            {showGlobalError && (
                <Alert.Root
                    status={"error"}
                    display={"flex"}
                    alignItems={"center"}
                    marginInline={"auto"}
                    maxW={"sm"}
                    mt={5}
                >
                    <Alert.Indicator />
                    <Alert.Content>
                        <Alert.Title>{error}</Alert.Title>
                    </Alert.Content>
                    <CloseButton
                        pos="relative"
                        onClick={() => setShowGlobalError(false)}
                    />
                </Alert.Root>
            )}
            <Box
                maxW="sm"
                mx="auto"
                mt={10}
                p={6}
                boxShadow="lg"
                borderRadius="md"
            >
                <Heading textAlign={"center"} mb={6}>
                    {t("auth_title", { type })}
                </Heading>
                <form onSubmit={onSubmitHanlder} noValidate>
                    <FormField
                        required
                        label={t("auth_form_email_label")}
                        invalid={!!errors.email}
                        errorText={errors.email}
                    >
                        <Input
                            name="email"
                            type="email"
                            value={authForm.email}
                            onChange={onChangeHandler}
                        ></Input>
                    </FormField>
                    <FormField
                        required
                        label={t("auth_form_password_label")}
                        invalid={!!errors.password}
                        errorText={errors.password}
                    >
                        <Input
                            name="password"
                            type="password"
                            value={authForm.password}
                            onChange={onChangeHandler}
                        ></Input>
                    </FormField>
                    {type === "register" && (
                        <FormField
                            required
                            label={t("auth_form_confirmPassword_label")}
                            invalid={!!errors.confirmPassword}
                            errorText={errors.confirmPassword}
                        >
                            <Input
                                name="confirmPassword"
                                type="password"
                                value={authForm.confirmPassword}
                                onChange={onChangeHandler}
                            ></Input>
                        </FormField>
                    )}
                    <Button
                        type="submit"
                        width="full"
                        mt={6}
                        disabled={hasErrors}
                        loading={loading}
                    >
                        {type === "login"
                            ? t("shared_login")
                            : t("shared_register")}
                    </Button>
                </form>
            </Box>
            <Box
                maxW="sm"
                mx="auto"
                mt={5}
                p={6}
                boxShadow="lg"
                borderRadius="md"
            >
                <Heading size={"md"} fontWeight={"normal"} textAlign={"center"}>
                    <span>{t("auth_redirect", { type })}</span>
                    <ChakraLink asChild colorPalette={"blue"} marginLeft={"2"}>
                        <Link
                            href={
                                type === "login"
                                    ? ROUTES.REGISTER
                                    : ROUTES.LOGIN
                            }
                        >
                            {t("auth_redirect_link", { type })}
                        </Link>
                    </ChakraLink>
                </Heading>
            </Box>
        </>
    );
}
