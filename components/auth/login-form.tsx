// strona login form
// CardWrapper to odwołania do stylów 
// 'use client' because of hook form
"use client";

import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
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
import { login } from "@/server-actions/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation"; 


// https://github.com/react-hook-form/resolvers#zod form hook
// tutaj napisane jak ma działać form czyli ma być e-mail i hasło 
// z.infer to po prostut zabrarnie typu (czyli w tym przypadku strignów) z LoginSchema
export const LoginForm = () => {

    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email in use with diffrent provider" : "";

    // useState it's for tell if user make correct form
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const OnSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values)
            .then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
    };

    return ( 
        <CardWrapper
            headerLabel="Welcome"
            backButtonLabel="Register here"
            backButtonHref="/auth/register"
            showSocial
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Write your e-mail adress"
                                        type="email"
                                        />
                                    </FormControl>
                                    {/* FormMessage robi, że jak jest błąd to pokazuje się napis 'Invalid email' 
                                    można go zmienić w index.ts*/}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                        placeholder="Type your password"
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
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full">
                        Login
                    </Button>
                    
                </form>

            </Form>
        </CardWrapper>
     )
}
 