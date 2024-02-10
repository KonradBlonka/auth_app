// server action for login, it executes functions on the server. 
//będzie to wyświetlane w terminalu, a na stronie internetowej
// it will be never bundled with the client so this file and functions are safe
"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth"; 
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";


//  function that accepts a parameter values conforming to the LoginSchema structure
export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedField = LoginSchema.safeParse(values);
    // safeParse to metoda biblioteki Zod w języku JavaScript, która umożliwia bezpieczne i szczegółowe walidowanie danych
    // zwraca szczegółową odpowiedź zamiast zgłaszać błąd, jeśli dane są nieprawidłowe
    // Zamiast gwałtownego przerwania działania akcji po stronie serwera z powodu nieprawidłowych danych,
    // przechwytuje je i zwraca ustrukturyzowaną odpowiedź z informacjami o problemie.
    // Informacje o błędach walidacji zwrócone przez safeParse można wykorzystać do 
    // wyświetlania użytkownikowi szczegółowych komunikatów o błędach, pomagając mu zrozumieć, które pola należy poprawić.

    if(!validatedField.success) {
        return { error: "Invalid fields"};
    }

    const { email, password } = validatedField.data;
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch(error) {
        if(error instanceof AuthError) {
            switch(error.type) {
                case "CredentialsSignin":
                    return {error: "invalid credentials"}
                default:
                    return {error: "IDK what's wrong"}
            }
        }
        throw error;
        // it will not redirect if i dont 'throw' error

    }

}