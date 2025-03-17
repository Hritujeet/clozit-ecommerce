"use client"
import React from 'react';
import CartItem from "@/components/CartItem";
import {useQuery} from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import {Button} from "@/components/ui/button";
import bag from "@/assets/bag.png"
import Image from "next/image";

const ShoppingCart = () => {
    const session = useSession();
    console.log(session.data)

    const query = useQuery({
        queryFn: async () => {
            if (session.data) {
                const response = await fetch("/api/cart")
                return await response.json()
            } else {
                return {
                    cart: JSON.parse(localStorage.getItem("Cart") as string) || []
                }
            }
        },
        queryKey: ["cart"]
    })

    console.log(query.data)

    if (!query.isFetching) return (
        <div
            className="flex flex-col p-8 space-y-4 sm:p-10 dark:bg-gray-50 dark:text-gray-800 container mx-auto">
            <h2 className="text-xl font-semibold">Your cart</h2>
            {query.data.cart.length == 0 && <div className={"flex md:flex-row flex-col justify-center items-center h-[40vh] bg-neutral-100 gap-4  "}>
                <Image src={bag} alt={"bag"} width={100} height={100}></Image>
                <h1 className="text-lg font-semibold text-neutral">Looks Like Your Bag is Empty!</h1>
            </div>}
            {query.data.cart.length > 0 && <>
                <ul className="flex flex-col divide-y dark:divide-gray-300">
                    <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
                        <CartItem></CartItem>
                    </li><li className="flex flex-col py-6 sm:flex-row sm:justify-between">
                        <CartItem></CartItem>
                    </li><li className="flex flex-col py-6 sm:flex-row sm:justify-between">
                        <CartItem></CartItem>
                    </li><li className="flex flex-col py-6 sm:flex-row sm:justify-between">
                        <CartItem></CartItem>
                    </li>
                </ul>
                <div className="space-y-2">
                    <p>Total amount:
                        <span className="font-semibold mx-2">357 €</span>
                    </p>
                    <p className="text-sm dark:text-gray-600">Not including taxes and shipping costs</p>
                </div>
                <div className="flex justify-start space-x-4">
                    <Button>Checkout</Button>
                </div>
            </>}
        </div>
    );
};

export default ShoppingCart;