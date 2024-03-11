"use client"

import Link from "next/link";

interface ClientButtonProps {
    children?: React.ReactNode;
}

export const ClientButton = ({
    children
}: ClientButtonProps) => {

    return(
        <Link href="/client">
        <span>
            {children}
        </span>
        </Link>
    )
}