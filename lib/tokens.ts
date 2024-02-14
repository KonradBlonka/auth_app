// token generator
// I use it in server-actions/register.ts
// and reset password

// generate verification token by email

import { getVerificationTokenByEmail } from '@/data/verification-token';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/db';
import { getPasswordResetTokenByEmail } from '@/data/reset-password-token';

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

export const generateResetPasswordToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await getPasswordResetTokenByEmail(email);

    if(existingToken) {
        await db.passwordResetToken.delete({
            where: { id: existingToken.id }
        });
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    })
    return passwordResetToken;
}
