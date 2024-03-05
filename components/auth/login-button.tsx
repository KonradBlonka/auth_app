"use client";

// * Get the router methods. For example router.push('/dashboard')
import {useRouter} from "next/navigation"; 

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "redirect",
    asChild?: boolean;
}

export const LoginButton = ({
    children,
    mode = "redirect",
    asChild
}: LoginButtonProps) => {
    const router = useRouter();
    const onClick = () =>{
        router.push("/auth/login");
    }

    return(
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}
