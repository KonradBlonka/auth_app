"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { setting } from "@/server-actions/setting";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingSchema } from "@/schemas";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { currentUser } from "@/hooks/current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { UserRole } from "@prisma/client";

const SettingsPage = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const user = currentUser();

    const { update } = useSession();
    const [isPending, startTransition] = useTransition();

    // form input
    const form = useForm<z.infer<typeof SettingSchema>>({
        resolver: zodResolver(SettingSchema),
        defaultValues: {
            name: user?.name || undefined,
            email: user?.email || undefined,
            password: undefined,
            newPassword: undefined,
            role: user?.role || undefined,
            enable2FA: user?.enable2FA || undefined,
        }
    });

    // submit update button once and change input,
    // if u click more it will not work until function end
    const onSubmit = (values: z.infer<typeof SettingSchema>) => {
        startTransition(() => {
            setting(values)
            .then((data) => {
                if(data.error) {
                    setError(data.error);
                }
                if(data.success) {
                    update();
                    setSuccess(data.success);
                }
            }) .catch(() => setError("Changing input problem"));
        })
    }

    return ( 
        <Card className="w-4/5">
            <CardHeader>
                <p className="text-xl text-center">Settings</p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-5">
                        <FormField control={form.control} name="name" render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Change your name
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="New name" disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}  
                        />

                        {user?.isOAuth === false && (<>
                        
                        <FormField control={form.control} name="email" render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Change your e-mail
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="New e-mail" disabled={isPending} type="email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}  
                        />
                        
                        <FormField control={form.control} name="password" render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Your current password
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Password" disabled={isPending} type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}  
                        />
                        
                        <FormField control={form.control} name="newPassword" render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Change your password
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="New password" disabled={isPending} type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}  
                        />
                        </>)}

                        <FormField control={form.control} name="role" render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Change your role
                                </FormLabel>
                                <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                                        <SelectItem value={UserRole.USER}>User</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}  
                        />

                        {user?.isOAuth === false && (<>
                        <FormField control={form.control} name="enable2FA" render={({field}) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-md border px-3 py-1 shadow-sm">
                                
                                <div className="space-y-0.5">
                                    <FormLabel>Two Factor Authentication</FormLabel>    
                                    <FormDescription>
                                        Enable two factor authentication for your account
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>

                                
                            </FormItem>
                        )}  
                        />
                        </>)}

                        

                        </div>
                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                        <Button disabled={isPending} type="submit">Save</Button>
                        
                    </form>
                </Form>
            </CardContent>
        </Card>
     );
}
 
export default SettingsPage;