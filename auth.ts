// https://authjs.dev/guides/upgrade-to-v5
// it trigger prisma adapter. I need adapter, because prisma doesn't support Edge
// https://authjs.dev/guides/upgrade-to-v5?authentication-method=middleware#edge-compatibility
// information about callbacks https://authjs.dev/guides/basics/callbacks


import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";
import { get2FAConfirmationUserId } from "./data/2FA-confirmation";
import { getAccountByUserId } from "./data/account";

declare module "next-auth" {
  interface User {
    /** The user's postal address. */
    role?: UserRole;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // if something goes wrong go to this pages
    pages: {
      signIn: "/auth/login",
      error: "/auth/error",
    },
    events: {
      // email is verified (Google oAuth)
      async linkAccount({ user }) {
        await db.user.update({
          where: { id: user.id },
          data: { emailVerified: new Date() }
        })
      }
    },
    callbacks: {
      // allow oAuth without verification
      async signIn({ user, account }) {
        if(account?.provider !== "credentials") {
          return true;
        }

        // Don't allow sigin in without email verification
        const existingUser = await getUserById(user.id);
        if(!existingUser?.emailVerified){
          return false;
        }

        if(existingUser.enable2FA) {
          const confirmation2FA = await get2FAConfirmationUserId(existingUser.id);
          console.log({ confirmation2FA });
          if(!confirmation2FA){
            return false;
          } 
          await db.confirm2FA.delete({
            where: { id: confirmation2FA.id }
          })
        }

        return true;
      },

      // if user didn't verified his mail he will not signup
      // async signIn({ user }) {
      //   const existingUser = await getUserById(user.id);
      //   if(!existingUser || !existingUser.emailVerified){
      //     return false;
      //   }

      //   return true;
      // },
      

      async session({ session, token }) {
        // https://authjs.dev/getting-started/typescript
        // jak dodaje session.user.role to podświetla się więc trzeba zrobić module augmention dla typescript,
        // podświetla się dlatego, że user nie istnieje w session 
        if(token.role && session.user){
          session.user.role = token.role as UserRole;
        }

        if(token.sub && session.user) {
          session.user.id = token.sub;
        }

        if(session.user){
          session.user.enable2FA = token.enable2FA as boolean;
        }

        if(session.user){
          session.user.name;
          session.user.email;
          session.user.isOAuth = token.isOAuth as boolean;
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

        const existingAccount = await getAccountByUserId(existingUser.id);
        // "!!" make exisitng Account a boolean
        token.isOAuth = !!existingAccount;

        token.name = existingUser.name;
        token.email = existingUser.email;

        token.role = existingUser.role;
        token.enable2FA = existingUser.enable2FA;
        return token
      }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt"},
    ...authConfig,  
})