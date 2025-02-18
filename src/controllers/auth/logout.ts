import { NextResponse } from "next/server";

export async function logout() {
    const response = NextResponse.json(
        { message: "Logged out" },
        { status: 200 },
    );
    response.cookies.set("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
    });

    return response;
}
