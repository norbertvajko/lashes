import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
    userRoutes
} from "@/routes";

const {auth} = NextAuth(authConfig);

export default auth((req): any => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isUserRoute = userRoutes.includes(nextUrl.pathname);

    // if (nextUrl.pathname === "/home") {
    //     return Response.redirect(new URL("/", nextUrl))
    // }

    if (isApiAuthRoute) {
        return null;
    }

    if (isUserRoute && !isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl))
    }

    return null;
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};