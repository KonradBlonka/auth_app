"use server"

import * as Z from "zod";

import { db } from "@/lib/db";
import { SettingSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";

export const setting = async (
    values: Z.infer<typeof SettingSchema>
) => {
    const user = await currentUser();

    if(!user) {
        return { error: "Unauthorized"};
    }

    const dbUser = await getUserById(user.id)

    if(!dbUser) {
        return { error: "Unauthorized"};
    }


    // u can't change email, password and enable2FA when login with OAuth
    if(user.isOAuth) {
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.enable2FA = undefined;
    }

    // there need to be entered email and entered email can't match with user email
    if(values.email && values.email !== user.email) {
        
        const existingUser = await getUserByEmail(values.email);

        // u can't take someone else email
        if(existingUser && existingUser.id !== user.id) {
            return { error: "Email already in use"}
        }

        // send verificationToken to email 
        const verificationToken = await generateVerificationToken(values.email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return { success: "Verification email sent"}
    }

    if(values.password && values.newPassword && dbUser.password) {
        const passwordMatch = await bcrypt.compare(values.password, dbUser.password)

        if(!passwordMatch) {
            return { error: "Incorrect password" }
        }

        const hashedPassword = await bcrypt.hash(values.newPassword, 8);
        values.password = hashedPassword;
        // newPassword undefined, because there is no field with this name in db
        values.newPassword = undefined;
    }

    

    await db.user.update({
        where: { id: dbUser.id },
        // spread all the values from SettingSchema
        data: { ...values } 
    });

    return { success: "Setting Updated"}
}