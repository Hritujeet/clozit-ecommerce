"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";
import { handleContact } from "@/actions/user.actions";
import toast from "react-hot-toast";

export type ContactFormType = {
    email: string;
    subject: string;
    description: string;
};

const Contact = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormType>();

    useEffect(() => {
        document.querySelectorAll("[fdprocessedid]").forEach((el) => {
            el.removeAttribute("fdprocessedid");
        });
    }, []);
    

    const mutation = useMutation({
        mutationFn: async (data: ContactFormType) => {
            await handleContact(data);
        },
        onSuccess: () => {
            reset();
            toast.success("We have recieved your message")
        },
        onError: ()=>{
            reset()
            toast.error("An unexpected error occurred. Refresh the page and try again")
        }
    });

    const onSubmit = (data: ContactFormType) => {
        mutation.mutate(data);
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                    Contact Us
                </h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                    Got a technical issue? Want to send feedback about a
                    feature? Need details about our Business plan? Let us know.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Your email
                        </label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                minLength: 6,
                            })}
                            type="email"
                            id="email"
                            className={`shadow-sm bg-gray-50 border text-gray-900 text-sm rounded-md focus:ring-primary-500 focus:border-primary-500 block w-full px-4 py-2 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light ${
                                errors.email
                                    ? "border-red-500"
                                    : "border-gray-300 dark:border-gray-600"
                            }`}
                            placeholder="name@example.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="subject"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Subject
                        </label>
                        <input
                            {...register("subject", {
                                required: "Subject is required",
                                minLength: 3,
                            })}
                            type="text"
                            id="subject"
                            className={`block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-md border shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light ${
                                errors.subject
                                    ? "border-red-500"
                                    : "border-gray-300 dark:border-gray-600"
                            }`}
                            placeholder="Let us know how we can help you"
                        />
                        {errors.subject && (
                            <p className="text-red-500 text-sm">
                                {errors.subject.message}
                            </p>
                        )}
                    </div>

                    <div className="sm:col-span-2">
                        <label
                            htmlFor="message"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                        >
                            Your message
                        </label>
                        <textarea
                            {...register("description", {
                                required: "Message is required",
                                minLength: 3,
                            })}
                            id="message"
                            rows={6}
                            className={`block px-4 py-2 w-full text-sm text-gray-900 bg-gray-50 rounded-md shadow-sm border focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                                errors.description
                                    ? "border-red-500"
                                    : "border-gray-300 dark:border-gray-600"
                            }`}
                            placeholder="Leave a comment..."
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-sm">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? <LoadingSpinner /> : "Send"}
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
