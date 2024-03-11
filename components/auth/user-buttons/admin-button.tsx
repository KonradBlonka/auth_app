"use client"

import Link from "next/link";

interface AdminButtonProps {
    children?: React.ReactNode;
}

export const AdminButton = ({
    children
}: AdminButtonProps) => {

    return(
        <Link href="/admin">
        <span>
            {children}
        </span>
        </Link>
    )
}