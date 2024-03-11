"use client"

import Link from "next/link";

interface ServerButtonProps {
    children?: React.ReactNode;
}

export const ServerButton = ({
    children
}: ServerButtonProps) => {

    return(
        <Link href="/server">
        <span>
            {children}
        </span>
        </Link>
    )
}