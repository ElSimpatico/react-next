import { User } from "@/models/User";

export interface AuthResponse {
    user: User;
    token?: string;
}

export interface AuthStrategy {
    authenticate(email: string, password: string): Promise<AuthResponse>;

    logout(): Promise<void>;

    register(email: string, password: string): Promise<AuthResponse>;

    validate(token: string): Promise<AuthResponse>;
}
