import { NextRequest, NextResponse } from "next/server";

import { ENDPOINTS } from "@/constants/endpoints";
import { ROUTES } from "@/constants/routes";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const nextPathname = req.nextUrl.pathname;
    const publicPaths = [
        ROUTES.LOGIN,
        ROUTES.REGISTER,
        ENDPOINTS.LOGIN,
        ENDPOINTS.REGISTER,
    ];
    const isPublicPath = publicPaths.some((path) =>
        nextPathname.startsWith(path),
    );

    if (token && isPublicPath) {
        return NextResponse.redirect(new URL(ROUTES.ROOT, req.url));
    }

    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/((?!_next/static|_next/image|favicon.ico|next.svg).*)",
};
