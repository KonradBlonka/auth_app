// https://authjs.dev/guides/upgrade-to-v5
// it trigger prisma adapter. I need adapter, because prisma doesn't support Edge
// https://authjs.dev/guides/upgrade-to-v5?authentication-method=middleware#edge-compatibility

import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt"},
    ...authConfig,  
})