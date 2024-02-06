"use client";

// * Get the router methods. For example router.push('/dashboard')
import {useRouter} from "next/navigation"; 

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect",
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

    // to jest po to żeby nie zapomnieć żeby coś innego zaimplementować
    // mogę się zmieniać pomiędzy funkcjami
    if (mode === "modal"){
        return (
            <span>
                TODO: IMPLEMENT MODAL
            </span>
        )
    }

    return(
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}
