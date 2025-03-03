import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDb } from "./utils/db";
import { User } from "./models/User";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { type: "email", label: "email" },
                password: { type: "password", label: "password" },
            },
            authorize: async (credentials) => {
                const { email, password } = credentials;

                if (!email || !password) {
                    throw new Error("Missing credentials", {
                        cause: "Sign In Error",
                    });
                }

                await connectDb();
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error("Invalid Credentials", {
                        cause: "User not found",
                    });
                }

                const passCompare = await compare(
                    password as string,
                    user.password
                );
                if (!passCompare) {
                    throw new Error("Invalid Credentials", {
                        cause: "Passwords Don't Match",
                    });
                }

                const userObject = user.toObject();
                delete userObject.password; // Remove sensitive data
                return userObject;
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token.user) {
                // @ts-ignore
                session.user = token.user; // No TypeScript error now
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user; // No TypeScript error now
            }
            return token;
        },
    },
});
