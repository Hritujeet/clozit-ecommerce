"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Credentials } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "@/components/LoadingSpinner";
import toast from "react-hot-toast";

const SignUpComponent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Credentials>();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: Credentials) => {
            const response = await fetch("/api/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.error) {
                toast.error(result.message);
                throw new Error(result.message);
            } else {
                toast.success(result.message);
                return result;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["account"] });
        },
        onError: (error) => {
            console.error("Sign-up error:", error);
        },
    });

    const myHandler = async (data: Credentials) => {
        mutation.mutate(data);
        reset();
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 flex-row-reverse">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            Sign Up
                        </h1>
                        <div className="w-full flex-1 mt-8">
                            <form
                                onSubmit={handleSubmit(myHandler)}
                                className="mx-auto max-w-xs space-y-4"
                            >
                                <div>
                                    <input
                                        {...register("username", {
                                            required: "Username is required",
                                            minLength: {
                                                value: 4,
                                                message: "Username should be at least 4 characters"
                                            }
                                        })}
                                        className={`w-full px-6 py-3 rounded-md font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white ${
                                            errors.username ? "border-red-500" : ""
                                        }`}
                                        placeholder="Username"
                                        type="text"
                                        name="username"
                                    />
                                    {errors.username && (
                                        <span className="text-red-500 text-xs mt-1 block">
                                            {errors.username.message}
                                        </span>
                                    )}
                                </div>
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
                                                message: "Password should be at least 6 characters"
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
                                        "Sign Up"
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

export default SignUpComponent;