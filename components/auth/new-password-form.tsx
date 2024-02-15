// strona login form
// CardWrapper to odwołania do stylów 
// 'use client' because of hook form
"use client";

import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
}   from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { newPassword } from "@/server-actions/new-password";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

// https://github.com/react-hook-form/resolvers#zod form hook
// tutaj napisane jak ma działać form czyli ma być e-mail i hasło 
// z.infer to po prostut zabrarnie typu (czyli w tym przypadku strignów) z LoginSchema
export const NewPasswordForm = () => {

    // take reset password token from URL
    const searchParams = useSearchParams();
    const token = searchParams.get("token");



    // useState it's for tell if user make correct form
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        },
    });

    const OnSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("");
        setSuccess("");

        console.log(values)

        startTransition(() => {
            newPassword(values, token)
            .then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
    };

    return ( 
        <CardWrapper
            headerLabel="Enter New Password"
            backButtonLabel="Login here"
            backButtonHref="/auth/login"
        >
            {/* spread the form {...form} => email, password values*/}
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(OnSubmit)}
                    className="space-y-5"
                >
                    <div className="space-y-5">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Write your new password"
                                        type="password"
                                        />
                                    </FormControl>
                                    {/* FormMessage robi, że jak jest błąd to pokazuje się napis 'Invalid email' 
                                    można go zmienić w index.ts*/}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                    </div>
                    {/* pokaż wiadomość czy prawidłowy login czy błedny login */}
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full">
                        Reset password
                    </Button>
                    
                </form>

            </Form>
        </CardWrapper>
     )
}
 