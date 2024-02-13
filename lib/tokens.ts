// token generator
// I use it in server-actions/register.ts

import { getVerificationTokenByEmail } from '@/data/verification-token';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/db';

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    // token expires after 1 hour
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    // token already exist? START
    const existingToken = await getVerificationTokenByEmail(email);

    // DELETE existingToken
    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    // CREATE new token
    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        }
    });

    return verificationToken

    // token already exist? END

}
