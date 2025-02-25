import { NextResponse, NextRequest } from "next/server";

import { JSONResponse } from "@/interfaces/Response";
import { User } from "@/models/User";
import { AuthService } from "@/services/auth";
import { JwtAuthStrategy } from "@/strategies/JwtAuth";

export async function login(req: NextRequest) {
    const authService = new AuthService(new JwtAuthStrategy());
    const { email, password } = await req.json();

    const { user, token } = await authService.login(email, password);
    const response = NextResponse.json<JSONResponse<User>>(
        { data: { ...user } },
        { status: 200 },
    );

    response.cookies.set("token", token!, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600,
    });

    return response;
}
