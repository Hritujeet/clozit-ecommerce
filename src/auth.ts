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
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

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

                const passCompare = await compare(password, user.password);
                if (!passCompare) {
                    throw new Error("Invalid Credentials", {
                        cause: "Passwords Don't Match",
                    });
                }

                // Convert Mongoose document to a plain object and remove sensitive fields
                const userObject = user.toObject();
                delete userObject.password;

                // Return the user object with the required fields
                return {
                    id: userObject._id.toString(), // Convert ObjectId to string
                    username: userObject.username,
                    email: userObject.email,
                };
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token.user) {
                // @ts-ignore
                session.user = token.user; // Attach the user object to the session
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user; // Attach the user object to the token
            }
            return token;
        },
    },
    pages: {
        signIn: "/auth/sign-in"
    }
});