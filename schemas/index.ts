import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Require e-mail"
    }),
    password: z.string().min(1, {
        message: "Require password"
    })
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