// it's for login-form.tsx
// robie to samo co w login-button.tsx tylko dla forms teraz

"use client"

import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { Header } from "./header";
import { Social } from "./social";
import { BackButton } from "./back-button";


interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
};

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}: CardWrapperProps) => {
    return(
        // card z ui/card z komponentów ściągniętych shadcn
        <Card className="w-[500px] shadow-md">
            
            <CardHeader>
                {/* musze dać 'label' ponieważ tak się odwołałem w header.tsx (exportuje wartość label z Header 
                i przypisuje jej headerlabel z CardWrappera (Przypisałem wartość headerLabel w login-form.tsx,  ale
                mogę je zawsze zmienić w innych stronach)) */}
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {/* jeżeli jest showSocial to cardfoot z zalogowaniem się przez google (można to skasować w login-form) */}
            {showSocial && (
            <CardFooter>
              <Social />  
            </CardFooter>
            )}
            <CardFooter>
                <BackButton 
                    href={backButtonHref}
                    label={backButtonLabel}
                />
            </CardFooter>

        </Card>   
    )
}
