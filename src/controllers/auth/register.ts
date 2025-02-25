import { NextRequest, NextResponse } from "next/server";

import { JSONResponse } from "@/interfaces/Response";
import { User } from "@/models/User";
import { AuthService } from "@/services/auth";
import { JwtAuthStrategy } from "@/strategies/JwtAuth";

export async function register(req: NextRequest) {
    const authService = new AuthService(new JwtAuthStrategy());
    const { email, password } = await req.json();

    const { user } = await authService.register(email, password);

    return NextResponse.json<JSONResponse<User>>({ data: { ...user } });
}
