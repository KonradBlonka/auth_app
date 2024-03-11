"use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { UserButton } from "@/components/auth/user-button";

export const Navbar =  () => {
    
    const pathname = usePathname();
    return(
        <nav className="flex bg-white justify-between items-center p-5 rounded-lg shadow-md w-4/5">
            {/* u can add buttons if you want */}
            {/* <div className="flex gap-x-2">
                <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
                    <Link href="/admin">
                        Admin
                    </Link>
                </Button>
                <Button asChild variant={pathname === "/client" ? "default" : "outline"}>
                    <Link href="/client">
                        Client
                    </Link>
                </Button>
                <Button asChild variant={pathname === "/server" ? "default" : "outline"}>
                    <Link href="/server">
                        Server
                    </Link>
                </Button>
                <Button asChild variant={pathname === "/settings" ? "default" : "outline"}>
                    <Link href="/settings">
                        Settings
                    </Link>
                </Button>
                
            </div>     */}
           <div className="flex"></div>
                <UserButton />
                
            
        </nav>
    )
}