// logout
// i can add things that do something before logout

"use server"

import { signOut } from "next-auth/react"

export const logout = async () => {
    await signOut();
}