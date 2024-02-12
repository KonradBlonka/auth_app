"use client"

import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";

export const Social = () => {
    const onClick = (provider: "google") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        } )
    }
    return(
        <div className="w-full flex items-center gap-x-3">
            <Button 
            size="lg" 
            className="w-full" 
            variant="outline" 
            onClick={() => onClick("google")}>
                <FcGoogle className="w-7 h-7"/>
            </Button>
        </div>
    )
}