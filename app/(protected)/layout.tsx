// page style for settings page (user after login page0)

import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
};

const ProtectedLayout = ({children}: ProtectedLayoutProps) => {
    return ( 
        <div className="w-full h-full flex flex-col items-center justify-center bg-black">
            <Navbar />
            {children}
        </div>
     );
}
 
export default ProtectedLayout;