"use server";
import { signIn } from "@/auth";
import { Credentials } from "@/utils/types";

export async function credentialSignInHandler(data: Credentials) {
    try {
        const credentials = { email: data.email, password: data.password };
        const result = await signIn("credentials", {
            ...credentials,
            redirect: false
        });

        return null; 
    } catch (error: any) {
        console.log(error); 
        if (error.cause && error.cause.err) {
            return error.cause.err.message;
        } else if (error.message) {
            return error.message; 
        } else {
            return "An unknown error occurred."; 
        }
    }
}