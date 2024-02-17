"use client";

import { FormSuccess } from "@/components/form-success";
import { RoleGate } from "@/components/role-gate";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";
import { admin } from "@/server-actions/admin";

const AdminPage = () => {

    const onServerActionClick = () => {
        admin()
        .then((data) => {
            if(data.error) {
                toast.error(data.error);
            }
            if(data.success) {
                toast.success(data.success);
            }
        })
    }

    const onApiRouteClick = () => {
        fetch("/api/admin")
        .then((response) => {
            if(response.ok) {
                toast.success("API route allowed");
            } else {
                toast.error("FORBIDDEN");
            }
        })
    }
    return(
        <Card className="w-4/5">
            <CardHeader> 
                <p className="text-xl text-center">Admin Page</p>
            </CardHeader>
                <CardContent className="space-y-4">
                    <RoleGate allowedRole={UserRole.ADMIN}>
                        <FormSuccess message="You are admin"></FormSuccess>
                    </RoleGate>
                    <div className="flex flex-row items-center justify-between rounded-md border p-3 shadow-md">
                        <p className="text-md">
                            Admin API Route
                        </p>
                        
                        <Button onClick={onApiRouteClick}>
                            Click to test
                        </Button>
                        
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-md border p-3 shadow-md">
                        <p className="text-md">
                            Admin Server Action
                        </p>
                        <Button onClick={onServerActionClick}>
                            Click to test
                        </Button>
                    </div>
                </CardContent>
            
        </Card>
    )
}

export default AdminPage;