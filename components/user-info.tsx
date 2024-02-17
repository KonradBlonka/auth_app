// server page
// show auth from server (information about user)

import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";

interface UserInfoProps {
    user?: ExtendedUser;
    label: string;
}

export const UserInfo = ({
    user,
    label,
}: UserInfoProps) => {
    return(
        <Card className="w-4/5 mt-8">
            <CardHeader>
                <p className="text-center text-xl">
                    {label}
                </p>
            </CardHeader>
            <CardContent className="space-y-5 ">
                <div className="flex flex-row items-center justify-between border rounded-sm p-3 shadow-sm">
                    <p>
                        ID:
                    </p>
                    <p className="truncate max-w-1/2 p-1">
                        {user?.id}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between border rounded-sm p-3 shadow-sm">
                    <p>
                        Name:
                    </p>
                    <p className="truncate max-w-1/2 p-1">
                        {user?.name}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between border rounded-sm p-3 shadow-sm">
                    <p>
                        Email:
                    </p>
                    <p className="truncate max-w-1/2 p-1">
                        {user?.email}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between border rounded-sm p-3 shadow-sm">
                    <p>
                        Role:
                    </p>
                    <p className="truncate max-w-1/2 p-1">
                        {user?.role}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between border rounded-sm p-3 shadow-sm">
                    <p>
                        2FA:
                    </p>
                    <p className="truncate max-w-1/2 p-1">
                        {user?.enable2FA ? "ON" : "OFF"}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}