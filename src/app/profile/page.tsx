import {auth} from '@/auth';
import React from 'react';
import {BsCart} from "react-icons/bs";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

const Page = async () => {
    const authData = await auth()
    console.log(authData);

    return (
        <div className='flex flex-col gap-4 w-[80vw] md:w-[50vw] mt-10 mx-auto'>
            <div className="overview grid grid-cols-1 gap-2">
                <div
                    className="card flex flex-col justify-center items-center px-8 py-4 border rounded-md cursor-default gap-2">
                   <span className="text-lg text-neutral-600 flex gap-2 justify-center items-center">
                       <BsCart className={"text-2xl"}/> Orders Made
                   </span>
                    <span className="text-4xl font-bold">20</span>
                </div>
            </div>
            <div className="grid grid-cols-1 1ap-2 md:w-[50vw] w-[80vw] mx-auto">
                <Link href={"/profile/orders"}
                      className={`font-semibold ${buttonVariants({size: "lg", variant: "default"})}`}>Orders</Link>
            </div>

            <div className="py-4 md:py-8">
                <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
                    <div className="space-y-4">
                        <dl>
                            <dt className="font-semibold text-gray-900 dark:text-white">User Name</dt>
                            <dd className="text-gray-500 dark:text-gray-400">{authData?.user?.name}</dd>
                        </dl>
                    </div>
                    <div className="space-y-4">
                        <dl className="">
                            <dt className="font-semibold text-gray-900 dark:text-white">Email Address</dt>
                            <dd className="text-gray-500 dark:text-gray-400">{authData?.user?.email}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;