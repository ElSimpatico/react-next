import { NextResponse, NextRequest } from "next/server";

import { AuthService } from "@/services/auth";
import { JwtAuthStrategy } from "@/strategies/JwtAuth";

export async function login(req: NextRequest) {
    try {
        const authService = new AuthService(new JwtAuthStrategy());
        const { email, password } = await req.json();

        const { user, token } = await authService.login(email, password);
        const response = NextResponse.json({ user }, { status: 200 });
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600,
        });

        return response;
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "";
        return NextResponse.json({ error: errorMessage }, { status: 401 });
    }
}
