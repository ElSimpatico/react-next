import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AuthStrategy } from "@/interfaces/AuthStrategy";
import { User } from "@/models/User";

export class JwtAuthStrategy implements AuthStrategy {
    async authenticate(
        email: string,
        password: string,
    ): Promise<{ user: User; token: string }> {
        const user = await new PrismaClient().user.findUnique({
            where: { email },
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error("Invalid email or passwrod");
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1h",
            },
        );

        return { user: { email: user.email }, token };
    }

    async logout() {}

    async register(email: string, password: string): Promise<{ user: User }> {
        const prisma = new PrismaClient();
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error("The user already exist");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: { email, password: hashedPassword },
        });

        return {
            user: {
                email: newUser.email,
            },
        };
    }

    async validate(token: string): Promise<User> {
        if (!token) {
            throw new Error("Unauthorized");
        }

        try {
            return jwt.verify(token, process.env.JWT_SECRET!) as User;
        } catch (err) {
            console.error("Validate", err);
            throw new Error("Invalid token");
        }
    }
}
