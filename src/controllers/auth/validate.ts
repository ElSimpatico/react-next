import { NextRequest, NextResponse } from "next/server";

import { JSONResponse } from "@/interfaces/Response";
import { User } from "@/models/User";
import { AuthService } from "@/services/auth";
import { JwtAuthStrategy } from "@/strategies/JwtAuth";

export async function validate(req: NextRequest) {
    const authService = new AuthService(new JwtAuthStrategy());
    const token = req.cookies.get("token")?.value;
    const { user } = await authService.validate(token ?? "");

    return NextResponse.json<JSONResponse<User>>({ data: { ...user } });
}
