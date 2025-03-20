"use client"
import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {useQuery} from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import {CartDataClient} from "@/utils/types";
import {Skeleton} from "@/components/ui/skeleton";

const OrderSummary = () => {
    const session = useSession();
    const [subtotal, setSubtotal] = useState(0);
    const query = useQuery({
        queryFn: async () => {
            if (session.data) {
                const response = await fetch("/api/cart");
                return await response.json();
            } else {
                return {
                    cart: JSON.parse(localStorage.getItem("Cart") as string) || []
                };
            }
        },
        queryKey: ["cart", session.data]
    });

    useEffect(() => {
        if (query.data?.cart) {
            const newSubtotal = query.data.cart.reduce((sum: number, item: { product: CartDataClient, qty: number }) =>
                sum + (item.product.price * item.qty), 0);
            setSubtotal(newSubtotal);
        }
    }, [query.data]);
    return (
        <div className="Summary w-full md:w-[50%] flex flex-col justify-center items-center">
            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                <h1 className="font-semibold text-center my-6 text-xl">Order Summary</h1>
                {!query.data?.cart ? (
                    <div
                        className={"flex flex-col justify-center items-center gap-4"}>
                        <Skeleton className={"h-14 w-full"}/>
                        <Skeleton className={"h-14 w-full"}/>
                    </div>
                ) : <ul className="grid">
                    {query.data.cart.map((item: { product: CartDataClient, qty: number }, index: number) => (
                        <li key={index} className="flex flex-col py-1 gap-3 sm:flex-row sm:justify-between">
                            <div
                                className="flex justify-between aspect-auto w-full items-center space-x-2 sm:space-x-4 border-b border-b-neutral-400 px-4">
                                <div className="flex flex-col justify-between w-full pb-4">
                                    <div className="flex justify-between w-full pb-2 space-x-2">
                                        <div className="space-y-1 flex justify-center items-center">
                                            <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                                                {item.product.name}
                                            </h3>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-semibold">${item.product.price}</p>
                                            <p className="text-sm dark:text-gray-400">
                                                Qty: {item.qty}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>}
                <div className="flow-root">
                    <h1 className="font-semibold text-center my-6 text-xl">Payment Summary</h1>
                    <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                        <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Subtotal</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">${subtotal}</dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Delivery Charges</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">$1.99</dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                            <dd className="text-base font-bold text-gray-900 dark:text-white">${subtotal + 1.99}</dd>
                        </dl>
                    </div>
                </div>
                <div className="space-y-3 w-full">
                    <Button className={"w-full"} type="submit">Place Order</Button>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;