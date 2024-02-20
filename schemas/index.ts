import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingSchema = z.object({
    name: z.optional(z.string()),
    enable2FA: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(8)),
    newPassword: z.optional(z.string().min(8)),
})
// check if newPassword and old one is present
.refine((data) => {
    if(data.password && !data.newPassword) {
        return false;
    }
    return true;
}, {
    message: "New Password is required",
    path: ["newPassword"],
})
.refine((data) => {
    if(data.newPassword && !data.password) {
        return false;
    }
    return true;
}, {
    message: "Your current password is required",
    path: ["password"],
})

export const NewPasswordSchema = z.object({
    password: z.string().min(8, {
        message: "Minimum 8 characters required"
    }),
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Require e-mail"
    }),
});


export const LoginSchema = z.object({
    email: z.string().email({
        message: "Require e-mail"
    }),
    password: z.string().min(1, {
        message: "Require password"
    }),
    code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Require e-mail"
    }),
    password: z.string().min(8, {
        message: "Minimum 8 characters required"
    }),
    name: z.string().min(1, {
        message: "Username is required"
    }),
     
});