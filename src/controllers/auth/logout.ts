import { NextResponse } from "next/server";

import { JSONResponse } from "@/interfaces/Response";

export async function logout() {
    const response = NextResponse.json<JSONResponse<null>>(
        { data: null },
        { status: 200 },
    );
    response.cookies.set("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
    });

    return response;
}
