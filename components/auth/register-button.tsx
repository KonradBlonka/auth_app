"use client";

// * Get the router methods. For example router.push('/dashboard')
import {useRouter} from "next/navigation"; 

interface RegisterButtonProps {
    children: React.ReactNode;
    mode?: "redirect",
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

    return(
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}
