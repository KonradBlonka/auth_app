//send verification mail and mail for password reset

import { Resend } from 'resend';

const domain = process.env.NEXT_PUBLIC_APP_URL;
const resend = new Resend(process.env.RESEND_API_KEY);


export const send2FATokenEmail = async (
    email: string,
    token: string,
) => {

    await resend.emails.send({
        from: "mail@auth-app.pl",
        to: email,
        subject: "2FA code",
        html: `<p>Your 2FA code: ${token}</p>`
    });
};



export const sendVerificationEmail = async (
    email: string,
    token: string,
) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "mail@auth-app.pl",
        to: email,
        subject: "Verification of your email",
        html: `<p>Click <a href="${confirmLink}">HERE</a> to confirm e-mail</p>`
    });
};

export const sendPasswordResetEmail = async (
    email: string,
    token: string,
) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "mail@auth-app.pl",
        to: email,
        subject: "Reset password",
        html: `<p>Click <a href="${resetLink}">HERE</a> to reset password</p>`
    });
};