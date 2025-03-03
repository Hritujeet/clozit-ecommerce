"use server";
import { signIn } from "@/auth";
import { Credentials } from "@/utils/types";

export async function credentialSignInHandler(data: Credentials) {
    try {
        const credentials = { email: data.email, password: data.password };
        const result = await signIn("credentials", {
            ...credentials,
            redirect: false,
        });

        console.log("SignIn result:", result); // Log the result

        if (!result?.ok) {
            throw new Error(result?.error || "Invalid Credentials");
        }

        return null; // No error, return null
    } catch (error: any) {
        console.log(error); // Log the error for debugging
        if (error.cause && error.cause.err) {
            return error.cause.err.message;
        } else if (error.message) {
            return error.message; // Fallback to the error message
        } else {
            return "An unknown error occurred."; // Default error message
        }
    }
}
