import {auth} from '@/auth';
import React from 'react';
import {BsCart} from "react-icons/bs";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {Phone, UserCircle} from "lucide-react";

const Page = async () => {
    const authData = await auth()
    console.log(authData);

    return (
        <div className='flex flex-col gap-4 w-[80vw] py-20 mx-auto'>
            <div className="overview grid grid-cols-1 md:grid-cols-2 gap-2">
                <div
                    className="card flex flex-col justify-center items-center px-8 py-4 border rounded-md cursor-default gap-2">
                    <span className="text-lg text-neutral-600 flex gap-2 justify-center items-center">
                       <UserCircle className={"text-2xl"}/> Account
                   </span>
                    <span
                        className="text-3xl font-semibold flex flex-col justify-center items-center">{authData?.user?.name}</span>
                </div>
                <div
                    className="card flex flex-col justify-center items-center px-8 py-4 border rounded-md cursor-default gap-2">
                   <span className="text-lg text-neutral-600 flex gap-2 justify-center items-center">
                       <BsCart className={"text-2xl"}/> Orders Made
                   </span>
                    <span className="text-4xl font-bold">20</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 md:w-[50vw] mx-auto">
                <Link href={"/profile/manage-profile"}
                      className={`font-semibold ${buttonVariants({size: "lg", variant: "default"})}`}>Manage
                    Account</Link>
                <Link href={"/profile/orders"}
                      className={`font-semibold ${buttonVariants({size: "lg", variant: "default"})}`}>Orders</Link>
            </div>

            <div className="py-4 md:py-8">
                <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
                    <div className="space-y-4">
                        <dl className="">
                            <dt className="font-semibold text-gray-900 dark:text-white">Email Address</dt>
                            <dd className="text-gray-500 dark:text-gray-400">{authData?.user?.email}</dd>
                        </dl>
                        <dl>
                            <dt className="font-semibold text-gray-900 dark:text-white">First Name</dt>
                            <dd className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                <svg className="hidden h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500 lg:inline"
                                     aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                     fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                                </svg>
                                First Name Some
                            </dd>
                        </dl>
                    </div>
                    <div className="space-y-4">
                        <dl>
                            <dt className="font-semibold text-gray-900 dark:text-white">Phone Number</dt>
                            <dd className="text-gray-500 dark:text-gray-400">+1234 567 890 / +12 345 678</dd>
                        </dl>
                        <dl>
                            <dt className="font-semibold text-gray-900 dark:text-white">Last Name</dt>
                            <dd className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                <svg className="hidden h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500 lg:inline"
                                     aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                     fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                                </svg>
                                Last Name Some
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;