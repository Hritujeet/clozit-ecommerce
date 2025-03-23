import {auth} from '@/auth';
import React from 'react';
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

const Page = async () => {
    const authData = await auth()
    console.log(authData);

    return (
        <div className='flex flex-col gap-4 w-[80vw] md:w-[50vw] mt-10 mx-auto py-24'>
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
            <div className="grid grid-cols-1 1ap-2 md:w-[50vw] w-[80vw] mx-auto">
                <Link href={"/profile/orders"}
                      className={`font-semibold ${buttonVariants({size: "lg", variant: "default"})}`}>Orders</Link>
            </div>

        </div>
    );
};

export default Page;