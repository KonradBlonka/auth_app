"use client";

import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/hooks/current-user";

const ClientPage =  () => {
    const user =  currentUser();
    return ( 
        <UserInfo label="Client information" user={user} />
            
        
     );
}
 
export default ClientPage;