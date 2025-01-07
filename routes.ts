import { APP_ROUTES, APP_ROUTES_USER } from "./constants/routes";

/**
 * An array of routes that are accesible to the public
 * These routes do not requrie authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification",
    "/auth/new-password",
    "/api/uploadthing",
    "/blog",
    "/contact",
    "home",
]

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
]

/**
 * An array of routes that are used for users
 * These routes require authentication
 * @type {string[]}
 */
export const userRoutes = [
    "/user",
    "/user/my-account",
    "/user/my-account/settings/profile",
    "/user/my-account/settings/manage-account",
]


/**
 * An array of routes that are used for admins
 * These routes require authentication and require userRole Admin
 * @type {string[]}
 */
export const adminRoutes = [
    "/admin",
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for APi authenticatiojn purposess
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logged in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/home";

/**
 * The default redirect path after loggout out
 * @type {string}
 */
export const DEFAULT_LOGOUT_REDIRECT = "/";