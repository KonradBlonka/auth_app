"use client"

import { logout } from "@/server-actions/logout";
import { currentUser } from "@/hooks/current-user";
const SettingsPage = () => {
    const CurrentUser = currentUser();

    const clickLogout = () => {
        logout();
    }

    return ( 
        <div>        
            <form className="bg-white text-black p-6">
                    <button onClick={clickLogout} type="submit">SignOut</button>
            </form>
        </div>
     );
}
 
export default SettingsPage;