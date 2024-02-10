// https://authjs.dev/guides/upgrade-to-v5
// it trigger prisma adapter. I need adapter, because prisma doesn't support Edge
// https://authjs.dev/guides/upgrade-to-v5?authentication-method=middleware#edge-compatibility
// information about callbacks https://authjs.dev/guides/basics/callbacks


import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
    callbacks: {
      async session({ session, token }) {
        // https://authjs.dev/getting-started/typescript
        // jak dodaje session.user.role to podświetla się więc trzeba zrobić module augmention dla typescript,
        // podświetla się dlatego, że user nie istnieje w session 
        if(token.role && session.user){
          session.user.role = token.role;
        }
        if(token.sub && session.user) {
          session.user.id = token.sub;
        }
        return session
      },
      // token to informacje o użytkowniku, które się wyświetlają, zdjęcie, nazwa, email itp.
      async jwt({ token }) {
        if(!token.sub){
          return token
        }
        const existingUser = await getUserById(token.sub);
        if (!existingUser) {
          return token;
        }
        token.role = existingUser.role;
        return token
      }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt"},
    ...authConfig,  
})