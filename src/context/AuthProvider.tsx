"use client";
import { useLocale } from "next-intl";
import React, {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

import { ENDPOINTS } from "@/constants/endpoints";
import { ROUTES } from "@/constants/routes";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "@/i18n/routing";
import { User } from "@/models/User";

export interface AuthContextType {
    user?: User;
    login: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside an AuthProvider");
    }

    return context;
}

export default function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User>();
    const router = useRouter();
    const locale = useLocale();
    const { post: postLogout, success: successLogout } = useFetch(
        ENDPOINTS.LOGOUT,
    );
    const {
        get: getValidate,
        data: userValidated,
        success: successValidate,
    } = useFetch<User>(ENDPOINTS.VALIDATE);

    const login = useCallback(
        (user: User) => {
            setUser(user);
            router.replace(ROUTES.ROOT);
        },
        [router],
    );

    const logout = useCallback(async () => {
        postLogout();
    }, [postLogout]);

    useEffect(() => {
        getValidate();
    }, [getValidate]);

    useEffect(() => {
        if (successValidate && userValidated) {
            setUser(userValidated);
        }
    }, [userValidated, successValidate]);

    useEffect(() => {
        if (successLogout) {
            setUser(undefined);
            window.location.replace(`${locale}${ROUTES.LOGIN}`);
        }
    }, [locale, successLogout]);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
