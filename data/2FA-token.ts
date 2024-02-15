import { db } from "@/lib/db";

export const get2FATokenByToken = async (token: string) => {
    try {
        const token2FA = await db.token2FA.findUnique({
            where: { token }
        });
        return token2FA;
    } catch {
        return null;
    }
};


export const get2FATokenByEmail = async (email: string) => {
    try {
        const token2FA = await db.token2FA.findFirst({
            where: { email }
        });
        return token2FA;
    } catch {
        return null;
    }
};