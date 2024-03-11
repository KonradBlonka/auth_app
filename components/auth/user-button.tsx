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
import { BiLogOut, BiCog, BiUser, BiBrain, BiServer } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { SettingsButton } from "./user-buttons/setting-button";
import { ClientButton } from "./user-buttons/client-button";
import { AdminButton } from "./user-buttons/admin-button";
import { ServerButton } from "./user-buttons/server-button";

export const UserButton = () => {
    const pathname = usePathname();
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
                <SettingsButton>
                    <DropdownMenuItem className="cursor-pointer">
                        <BiCog className="h-4 w-4 mr-2"/>
                        Settings
                    </DropdownMenuItem>
                </SettingsButton>
                <ClientButton>
                    <DropdownMenuItem className="cursor-pointer">
                        <BiUser className="h-4 w-4 mr-2"/>
                        Client
                    </DropdownMenuItem>
                </ClientButton>
                <AdminButton>
                    <DropdownMenuItem className="cursor-pointer">
                        <BiBrain className="h-4 w-4 mr-2"/>
                        Admin
                    </DropdownMenuItem>
                </AdminButton>
                <ServerButton>
                    <DropdownMenuItem className="cursor-pointer">
                        <BiServer className="h-4 w-4 mr-2"/>
                        Server
                    </DropdownMenuItem>
                </ServerButton>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}