"use server";

import { getPasswordResetTokenByToken } from "@/data/reset-password-token";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token?: string | null) => {
   if(!token){
    return { error: "Missing new password token"};
   }

   const validatedField = NewPasswordSchema.safeParse(values);

   if(!validatedField.success) {
    return { error: "Invalid field" }
   }

   const { password } = validatedField.data;

   const existingToken = await getPasswordResetTokenByToken(token);

   if(!existingToken) {
    return { error: "NewPassword token not found"};
   }

   const hasExpired = new Date(existingToken.expires) < new Date();

   if(hasExpired) {
    return { error: "NewPassword token has expired"}
   }

   const existingUser = await getUserByEmail(existingToken.email);

   if(!existingUser) {
    return { error: "Email does not exist"};
   }

   const hashedPassword = await bcrypt.hash(password, 8);

   await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
   });

   await db.passwordResetToken.delete({
    where: { id: existingToken.id }
   });

   return { success: "Password updated"};
};