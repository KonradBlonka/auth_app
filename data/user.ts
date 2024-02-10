//finding user id and email in database
// zamiast pisać w server-actions/register
// const existingUser = await db.user.findUnique({
//     where: {
//         email
//     }
// })

import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({where: {email}});
        return user
    } catch {
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({where: {id}});
        return user
    } catch {
        return null;
    }
};