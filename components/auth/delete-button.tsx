"use client";

// * Get the router methods. For example router.push('/dashboard')
import {useRouter} from "next/navigation"; 
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog" 

interface DeleteButtonProps {
    children: React.ReactNode;
    mode?: "redirect" | "modal",
    asChild?: boolean;
}

export const DeleteButton = ({
    children,
    mode = "redirect",
    asChild
}: DeleteButtonProps) => {
    const router = useRouter();
    const onClick = () =>{
        router.push("/auth/login");
    }

    if(mode === "modal") {
        return(
            <Dialog>
                <DialogTrigger>

                </DialogTrigger>
            </Dialog>
        )
    }

    return(
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}
