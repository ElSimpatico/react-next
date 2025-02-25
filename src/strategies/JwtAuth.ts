import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AuthResponse, AuthStrategy } from "@/interfaces/AuthStrategy";
import { User } from "@/models/User";
import { CustomError } from "@/utils/error";

export class JwtAuthStrategy implements AuthStrategy {
    async authenticate(email: string, password: string): Promise<AuthResponse> {
        const user = await new PrismaClient().user.findUnique({
            where: { email },
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new CustomError(
                "Invalid email or password",
                "error_unauthorized_user",
                401,
            );
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1h",
            },
        );

        return {
            user: { email: user.email },
            token,
        };
    }

    async logout() {}

    async register(email: string, password: string): Promise<AuthResponse> {
        const prisma = new PrismaClient();
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new CustomError(
                "The user already exist",
                "error_user_exist",
                409,
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: { email, password: hashedPassword },
        });

        return {
            user: { email: newUser.email },
        };
    }

    async validate(token: string): Promise<AuthResponse> {
        if (!token) {
            throw new CustomError("Unauthorized", "error_unauthorized", 401);
        }

        try {
            const user = jwt.verify(token, process.env.JWT_SECRET!) as User;
            return { user: { email: user.email }, token };
        } catch {
            throw new CustomError("Invalid token", "error_invalid_token", 401);
        }
    }
}
