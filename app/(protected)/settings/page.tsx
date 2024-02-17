"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { setting } from "@/server-actions/setting";
import { useTransition } from "react";

const SettingsPage = () => {
    const [isPending, startTransition] = useTransition();
    const onClick = () => {
        startTransition(() => {
            setting({
                name: "New Name"
            })
        })
    }

    return ( 
        <Card className="w-4/5">
            <CardHeader>
                <p className="text-xl text-center">Settings</p>
            </CardHeader>
            <CardContent>
                <Button disabled={isPending} onClick={onClick}>Update name</Button>
            </CardContent>
        </Card>
     );
}
 
export default SettingsPage;