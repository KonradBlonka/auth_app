"use server"

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import * as z from "zod";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generateResetPasswordToken } from "@/lib/tokens";

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
    const validatedField = ResetSchema.safeParse(values);

    if(!validatedField.success) {
        return { error: "Invalid email"};
    }

    const { email }  = validatedField.data;
    const existingUser = await getUserByEmail(email);

    if(!existingUser) {
        return { error: "Email not found"}
    }

    const passwordResetToken = await generateResetPasswordToken(email);
    await sendPasswordResetEmail(
        passwordResetToken.email, 
        passwordResetToken.token,
    );

    return { success: "Email sent"}
}