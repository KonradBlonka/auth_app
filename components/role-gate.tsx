"use client";

import { UserRole } from "@prisma/client";
import { currentRole } from "@/hooks/current-role";
import { FormError } from "./form-error";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole;
}

export  const RoleGate = ({
    children,
    allowedRole,
}: RoleGateProps) => {
    const role = currentRole();
    if(role !== allowedRole){
        return(
            <FormError message="You don't have permission to view this site"/>
        )
    }
    return(
        <>
            {children}
        </>
    )
}