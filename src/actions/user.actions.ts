"use server";
import { signIn, signOut } from "@/auth";
import { ContactFormType } from "@/components/Contact";
import { Contact } from "@/models/Contact";
import { connectDb } from "@/utils/db";
import { Credentials } from "@/utils/types";

export async function credentialSignInHandler(data: Credentials) {
    try {
        const credentials = { email: data.email, password: data.password };
        await signIn("credentials", {
            ...credentials,
            redirect: false,
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

export async function handleGoogleSignIn() {
    try {
        await signIn("google", { redirect: false });
    } catch (error: any) {
        return error;
    }
}

export async function handleContact(data: ContactFormType) {
    const {email, subject, description} = data;
    await connectDb()

    const contact = await Contact.create({
        email, subject, description
    })
    console.log(contact);
}