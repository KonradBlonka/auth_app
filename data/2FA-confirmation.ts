import { db } from "@/lib/db";

export const get2FAConfirmationUserId = async (userId: string) => {
    try {
        const confirm2FA = await db.confirm2FA.findUnique({
            where: { userId }
        });
        return confirm2FA;
    } catch {
        return null;
    }
};