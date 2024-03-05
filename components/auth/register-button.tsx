"use client";

// * Get the router methods. For example router.push('/dashboard')
import {useRouter} from "next/navigation"; 
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface RegisterButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect",
    asChild?: boolean;
}

export const RegisterButton = ({
    children,
    mode = "redirect",
    asChild
}: RegisterButtonProps) => {
    const router = useRouter();
    const onClick = () =>{
        router.push("/auth/register");
    }

    // if (mode === "modal"){
    //     return (
    //         <Dialog>
    //             <DialogTrigger asChild={asChild}>
    //                 {children}
    //             </DialogTrigger>
    //             <DialogContent className="p-0 w-auto bg-transparent rounded-xl">
    //             </DialogContent>
    //         </Dialog>
    //     )
    // }

    return(
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}
