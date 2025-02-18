import { NextRequest, NextResponse } from "next/server";

import { AuthService } from "@/services/auth";
import { JwtAuthStrategy } from "@/strategies/JwtAuth";

export async function register(req: NextRequest) {
    try {
        const authService = new AuthService(new JwtAuthStrategy());
        const { email, password } = await req.json();

        const newUser = await authService.register(email, password);

        return NextResponse.json({ user: newUser });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "";
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
}
