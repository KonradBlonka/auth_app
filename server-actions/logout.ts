// logout
// i can add things that do something before logout

"use server"

import { signOut } from "@/auth"

export const logout = async () => {
    await signOut();
}