import {
    Box,
    Button,
    Heading,
    Input,
    Alert,
    CloseButton,
    Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import React, {
    ChangeEvent,
    FormEvent,
    useCallback,
    useEffect,
    useState,
} from "react";

import { ROUTES } from "@/constants/routes";
import FormField from "@/ui/components/formField/FormField";

import { AuthFormProps, AuthFormFieds, initAuthForm } from "./AuthFormProps";
import useValidate from "./useValidate";

export default function AuthForm({
    onSubmit,
    type,
    error,
    loading,
}: AuthFormProps) {
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
                    {type === "login" ? "Iniciar sesion" : "Registro"}
                </Heading>
                <form onSubmit={onSubmitHanlder} noValidate>
                    <FormField
                        required
                        label="Email"
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
                        label="Contraseña"
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
                            label="Confirmar contraseña"
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
                        {type === "login" ? "Iniciar sesion" : "Registrarse"}
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
                    <span>
                        {type === "login"
                            ? "New in Next.js?"
                            : "Already have an account?"}
                    </span>
                    <ChakraLink asChild colorPalette={"blue"} marginLeft={"2"}>
                        {type === "login" ? (
                            <Link href={ROUTES.REGISTER}>Create an count</Link>
                        ) : (
                            <Link href={ROUTES.LOGIN}>Sign in</Link>
                        )}
                    </ChakraLink>
                </Heading>
            </Box>
        </>
    );
}
