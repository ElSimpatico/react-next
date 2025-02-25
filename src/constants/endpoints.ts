export const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}/api`;

export const ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    VALIDATE: `${API_BASE_URL}/auth/validate`,
};
