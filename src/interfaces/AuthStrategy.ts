import { User } from "@/models/User";

export interface AuthStrategy {
    authenticate(
        email: string,
        password: string,
    ): Promise<{ user: User; token: string }>;

    logout(): Promise<void>;

    register(email: string, password: string): Promise<{ user: User }>;

    validate(token: string): Promise<User>;
}
