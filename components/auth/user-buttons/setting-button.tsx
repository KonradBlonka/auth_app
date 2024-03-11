"use client"

import Link from "next/link";

interface SettingsButtonProps {
    children?: React.ReactNode;
}

export const SettingsButton = ({
    children
}: SettingsButtonProps) => {

    return(
        <Link href="/settings">
        <span>
            {children}
        </span>
        </Link>
    )
}