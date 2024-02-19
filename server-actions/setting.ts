"use server"

import * as Z from "zod";

import { db } from "@/lib/db";
import { SettingSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

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

    if(user.isOAuth) {
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.is2FAenabled = undefined;
    }

    await db.user.update({
        where: { id: dbUser.id },
        // spread all the values from SettingSchema
        data: { ...values } 
    });

    return { success: "Setting Updated"}
}