"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Credentials } from "@/utils/types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";
import { credentialSignInHandler } from "@/actions/user.actions";

const SignInComponent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Credentials>();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: Credentials) => {
            const error = await credentialSignInHandler(data);
            if (error) {
                toast.error(error);
                throw new Error(error);
            } else {
                console.log("Sign-in successful, redirecting...");
                toast.success("Signed In Successfully");
                setTimeout(() => {
                    window.location.replace("/");
                }, 1000);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["account"] });
        },
        onError: (error) => {
            console.error("Sign-in error:", error);
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
                            <form
                                onSubmit={handleSubmit(myHandler)}
                                className="mx-auto max-w-xs space-y-4"
                            >
                                <div>
                                    <input
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        className={`w-full px-6 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white ${
                                            errors.email ? "border-red-500" : ""
                                        }`}
                                        placeholder="Email"
                                        type="email"
                                        name="email"
                                    />
                                    {errors.email && (
                                        <span className="text-red-500 text-xs mt-1 block">
                                            {errors.email.message}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <input
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters"
                                            }
                                        })}
                                        className={`w-full px-6 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white ${
                                            errors.password ? "border-red-500" : ""
                                        }`}
                                        placeholder="Password"
                                        type="password"
                                        name="password"
                                    />
                                    {errors.password && (
                                        <span className="text-red-500 text-xs mt-1 block">
                                            {errors.password.message}
                                        </span>
                                    )}
                                </div>
                                <Button
                                    type="submit"
                                    disabled={mutation.isPending}
                                    className="mt-6 font-semibold w-full"
                                >
                                    {mutation.isPending ? (
                                        <LoadingSpinner />
                                    ) : (
                                        "Sign In"
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