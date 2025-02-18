import { NextRequest, NextResponse } from "next/server";

import { AuthService } from "@/services/auth";
import { JwtAuthStrategy } from "@/strategies/JwtAuth";

export async function validate(req: NextRequest) {
    try {
        const authService = new AuthService(new JwtAuthStrategy());
        const token = req.cookies.get("token")?.value;
        const user = await authService.validate(token ?? "");

        return NextResponse.json({ user });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "";
        return NextResponse.json({ error: errorMessage }, { status: 401 });
    }
}
