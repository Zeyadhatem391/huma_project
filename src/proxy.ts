// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login", "/register", "/forgot-password"];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const token = request.cookies.get("token")?.value;
    const isLoggedIn = Boolean(token);
    const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

    if (!isLoggedIn && !isPublic) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (isLoggedIn && isPublic) {
        return NextResponse.redirect(new URL("/", request.url));
    }


    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

