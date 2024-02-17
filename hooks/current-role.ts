// it works for client components

import { useSession } from "next-auth/react";


export const currentRole = () => {
    const session = useSession();
    return session.data?.user.role;
}