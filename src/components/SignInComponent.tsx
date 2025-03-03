"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Credentials } from "@/utils/types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";
import { credentialSignInHandler } from "@/actions/user.actions";
import { useRouter } from "next/navigation";

const SignInComponent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Credentials>();
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (data: Credentials) => {
            const error = await credentialSignInHandler(data);
            if (error) {
                toast.error(error); // Display the specific error message
            } else {
                console.log("Sign-in successful, redirecting...");
                toast.success("Signed In Successfully");
                router.replace("/"); // Redirect to the home page
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["account"] });
        },
    });

    const myHandler = async (data: Credentials) => {
        mutation.mutate(data);
        reset();
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            Sign In
                        </h1>
                        <div className="w-full flex-1 mt-8">
                            <div className="flex flex-col items-center">
                                <Button variant={"outline"}>
                                    <div className="bg-white p-2 rounded-full">
                                        <svg
                                            className="w-4"
                                            viewBox="0 0 533.5 544.3"
                                        >
                                            <path
                                                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                fill="#4285f4"
                                            />
                                            <path
                                                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                fill="#34a853"
                                            />
                                            <path
                                                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                fill="#fbbc04"
                                            />
                                            <path
                                                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                fill="#ea4335"
                                            />
                                        </svg>
                                    </div>
                                    <span className="ml-4">
                                        Continue with Google
                                    </span>
                                </Button>
                            </div>

                            <div className="my-12 border-b text-center">
                                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Or sign in with e-mail
                                </div>
                            </div>

                            <form
                                onSubmit={handleSubmit(myHandler)}
                                className="mx-auto max-w-xs space-y-2"
                            >
                                <div>
                                    <input
                                        {...register("email", {
                                            required: true,
                                        })}
                                        className={`w-full px-6 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-2"
                                        type="email ${
                                            errors.email ? "border-red-500" : ""
                                        }`}
                                        placeholder="Email"
                                        type={"email"}
                                        name={"email"}
                                    />
                                </div>
                                <span
                                    className={`${
                                        errors.email ? "block" : "hidden"
                                    } text-red-500 my-2 text-xs`}
                                >
                                    Email is required
                                </span>
                                <div>
                                    <input
                                        {...register("password", {
                                            required: true,
                                        })}
                                        className={`w-full px-6 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-2"
                                        type="password ${
                                            errors.password
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        placeholder="Password"
                                        type={"password"}
                                        name={"password"}
                                    />
                                </div>
                                <span
                                    className={`${
                                        errors.password ? "block" : "hidden"
                                    } text-red-500 my-2 text-xs`}
                                >
                                    Password is required
                                </span>
                                <Button
                                    disabled={mutation.isPending}
                                    className={"my-5 font-semibold w-full"}
                                >
                                    {mutation.isPending ? (
                                        <LoadingSpinner />
                                    ) : (
                                        "Sign up"
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default SignInComponent;