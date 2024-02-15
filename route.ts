/**
 * array of routes that are accessible to the public
 * these routes do not require authentication
 * @type {string[]}
 */
// I add "/auth/new-verification" in publicRoutes, because user will be able to change email
export const publicRoutes = [
    "/",
    "/auth/new-verification"
];

/**
 * array of routes that are used for authentication
 * these routes wil redirect logged in users to /settings
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
];

/**
 * prefix for API auth routes
 * routes that start with this prefix are used for API auth purpose
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * redirect path after loggin in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";