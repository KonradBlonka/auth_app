// form style and actions for app/auth/new-verification/page
//useSearch is for finding token in URL 

"use client"

import { CardWrapper } from "./card-wrapper";
import { MoonLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/server-actions/new-verification";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";

export const NewVerificationPageForm = () => {

    // error, success alerts
    const [ error, setError ] = useState<string | undefined>();
    const [ success, setSuccess ] = useState<string | undefined>();

    // search for token from URL
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const onSubmit = useCallback(() => {
        if(success || error) return;

        console.log(token);

        if(!token){
            setError("There is no token new-verification-form")
            return;
        }
        newVerification(token)
        .then((data) => {
            setSuccess(data.success);
            setError(data.error);
        })
        .catch(() => {
            setError("Something went wrong in token newVerification")
        })
    }, [ token, success, error ]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);


    return ( 
        <CardWrapper
        headerLabel="Confirming your verification"
        backButtonLabel="Return to login"
        backButtonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                <MoonLoader speedMultiplier={0.3} />    
                )}
            </div>
            <div className="flex items-center w-full justify-center">
            <FormSuccess message={success} />
            {!success && (
                <FormError message={error} />
            )}
                            
            </div>
        </CardWrapper>
     );
}
 