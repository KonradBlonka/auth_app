"use client"

import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

export const Social = () => {
    return(
        <div className="w-full flex items-center gap-x-3">
            <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
                <FcGoogle className="w-7 h-7"/>
            </Button>
        </div>
    )
}