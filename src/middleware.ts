import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { API_BASE_URL } from "@/constants/endpoints";
import { ROUTES } from "@/constants/routes";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

const apiMiddleware = (req: NextRequest, lang: string) => {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("X-Locale", lang);

    const response = NextResponse.next();
    response.headers.set("X-Locale", lang);
    return response;
};

const authMiddleware = (req: NextRequest, lang: string) => {
    const nextPathname = req.nextUrl.pathname;

    // 3️⃣ Redirigir `/` a `/{lang}` si no es una API request
    if (nextPathname === ROUTES.ROOT) {
        return NextResponse.redirect(new URL(`/${lang}`, req.url));
    }

    // 5️⃣ Manejar autenticación para páginas protegidas
    const token = req.cookies.get("token")?.value;
    const publicPaths = [
        `/${lang}${ROUTES.LOGIN}`,
        `/${lang}${ROUTES.REGISTER}`,
    ];

    const isPublicPath = publicPaths.some((path) =>
        nextPathname.startsWith(path),
    );

    if (token && isPublicPath) {
        return NextResponse.redirect(
            new URL(`/${lang}${ROUTES.ROOT}`, req.url),
        );
    }

    if (!token && !isPublicPath) {
        return NextResponse.redirect(
            new URL(`/${lang}${ROUTES.LOGIN}`, req.url),
        );
    }

    return intlMiddleware(req);
};

export function middleware(req: NextRequest) {
    const nextPathname = req.nextUrl.pathname;
    const isApiRequest = nextPathname.startsWith(API_BASE_URL);

    // 1️⃣ Detectar el idioma desde la URL si está presente
    let lang = routing.locales.find((locale) =>
        nextPathname.startsWith(`/${locale}`),
    ) as string;

    // 2️⃣ Si no está en la URL, obtenerlo de `X-Locale` (solo para API)
    if (!lang) {
        lang = isApiRequest
            ? (req.headers.get("X-Locale") ?? routing.defaultLocale)
            : routing.defaultLocale;
    }

    if (isApiRequest) {
        return apiMiddleware(req, lang);
    }

    return authMiddleware(req, lang);
}

export const config = {
    matcher: ["/", "/(en|es)/:path*", "/api/:path*"],
};
