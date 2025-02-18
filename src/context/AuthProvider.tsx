"use client";
import { useRouter } from "next/navigation";
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

export interface User {
    email: string;
}

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
    const { post: postLogout, success: successLogout } = useFetch(
        ENDPOINTS.LOGOUT,
    );
    const {
        get: getValidate,
        data: dataValidate,
        success: successValidate,
    } = useFetch<{ user: User }>(ENDPOINTS.VALIDATE);

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
        if (successValidate && dataValidate) {
            setUser(dataValidate.user);
        }
    }, [dataValidate, successValidate]);

    useEffect(() => {
        if (successLogout) {
            setUser(undefined);
            window.location.replace(ROUTES.LOGIN);
        }
    }, [successLogout]);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
