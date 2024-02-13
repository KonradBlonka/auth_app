// server action for login, it executes functions on the server. 
//będzie to wyświetlane w terminalu, a na stronie internetowej
// it will be never bundled with the client so this file and functions are safe
"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

//  function that accepts a parameter values conforming to the LoginSchema structure
export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedField = RegisterSchema.safeParse(values);
    // safeParse to metoda biblioteki Zod w języku JavaScript, która umożliwia bezpieczne i szczegółowe walidowanie danych
    // zwraca szczegółową odpowiedź zamiast zgłaszać błąd, jeśli dane są nieprawidłowe
    // Zamiast gwałtownego przerwania działania akcji po stronie serwera z powodu nieprawidłowych danych,
    // przechwytuje je i zwraca ustrukturyzowaną odpowiedź z informacjami o problemie.
    // Informacje o błędach walidacji zwrócone przez safeParse można wykorzystać do 
    // wyświetlania użytkownikowi szczegółowych komunikatów o błędach, pomagając mu zrozumieć, które pola należy poprawić.

    if(!validatedField.success) {
        return { error: "Invalid fields"};
    }

    //encrypt mail, password, name 
    const { email, password, name } = validatedField.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if(existingUser) {
        return { error: "Email already occupied"}
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
    );

    return {success: "Confirmation email sent"};
}