// For simple use cases within React components
// and real-time updates are paramount, useSession is a great choice (in hooks).
// If you need more flexibility, server-side compatibility, or granular control 
// over session management, opt for the custom auth function approach.

// it works in API routes and server components

import { auth } from "@/auth";

export const currentUser = async () => {
    const session = await auth();
    return session?.user;
}

export const currentRole = async () => {
    const session = await auth();
    return session?.user.role;
}