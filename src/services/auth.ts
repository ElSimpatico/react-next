import { AuthStrategy } from "@/interfaces/AuthStrategy";

export class AuthService {
    private strategy: AuthStrategy;

    constructor(strategy: AuthStrategy) {
        this.strategy = strategy;
    }

    async login(email: string, password: string) {
        return this.strategy.authenticate(email, password);
    }

    async logout() {
        return this.strategy.logout();
    }

    async register(email: string, password: string) {
        return this.strategy.register(email, password);
    }

    async validate(token: string) {
        return this.strategy.validate(token);
    }
}
