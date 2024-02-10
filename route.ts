/**
 * array of routes that are accessible to the public
 * these routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
];

/**
 * array of routes that are used for authentication
 * these routes wil redirect logged in users to /settings
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
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