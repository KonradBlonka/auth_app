// npx shadcn-ui@latest add avatar 
// npx shadcn-ui@latest add dropdown-menu
// i add here avatar image
// dropdown menu

"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa"
import { currentUser } from "@/hooks/current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { BiLogOut } from "react-icons/bi";

export const UserButton = () => {
    const user = currentUser();
    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} />
                        <AvatarFallback className="bg-black">
                            <FaUser className="text-white"/>
                        </AvatarFallback>
                    
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-30" align="end">
                <LogoutButton>
                    <DropdownMenuItem className="cursor-pointer">
                        <BiLogOut className="h-4 w-4 mr-2" />
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}