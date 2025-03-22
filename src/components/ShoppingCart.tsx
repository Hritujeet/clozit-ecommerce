"use client"
import React, {useEffect, useState} from 'react';
import CartItem from "@/components/CartItem";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import {Button, buttonVariants} from "@/components/ui/button";
import bag from "@/assets/bag.png"
import Image from "next/image";
import {CartDataClient} from "@/utils/types";
import {clearCartClient} from "@/utils/cart-client";
import LoadingSpinner from "@/components/LoadingSpinner";
import {clearCartServer} from "@/actions/cart.actions";
import toast from "react-hot-toast";
import Link from "next/link";

const ShoppingCart = () => {
    const session = useSession();
    const [subtotal, setSubtotal] = useState(0);
    const queryClient = useQueryClient()

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

    const clearCartMutation = useMutation({
        mutationFn: async () => {
            await clearCartServer(session.data?.user?.email as string)
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({queryKey: ["cart"]})
        }
    })

    // Calculate subtotal when cart data changes
    useEffect(() => {
        if (query.data?.cart) {
            const newSubtotal = query.data.cart.reduce((sum: number, item: { product: CartDataClient, qty: number }) =>
                sum + (item.product.price * item.qty), 0);
            setSubtotal(newSubtotal);
        }
    }, [query.data]);

    if (query.isFetching) return (
        <div className={"flex md:flex-row flex-col justify-center items-center h-[40vh] bg-neutral-100 gap-4"}>
            <LoadingSpinner/>
        </div>
    );

    return (
        <div className="flex flex-col p-8 space-y-4 sm:p-10 dark:bg-gray-50 dark:text-gray-800 container mx-auto">
            <h2 className="text-xl font-semibold">Your cart</h2>
            {query.data?.cart?.length === 0 || !query.data?.cart ? (
                <div className={"flex md:flex-row flex-col justify-center items-center h-[40vh] bg-neutral-100 gap-4"}>
                    <Image src={bag} alt={"bag"} width={100} height={100}/>
                    <h1 className="text-lg font-semibold text-neutral">Looks Like Your Bag is Empty!</h1>
                </div>
            ) : (
                <>
                    <ul className="grid md:grid-cols-3 xl:grid-cols-4 grid-cols-1 divide-y dark:divide-gray-300">
                        {query.data.cart.map((item: { product: CartDataClient, qty: number }, index: number) => (
                            <li key={index} className="flex flex-col py-6 sm:flex-row sm:justify-between">
                                <CartItem
                                    name={item.product.name}
                                    size={item.product.size}
                                    slug={item.product.slug}
                                    price={item.product.price}
                                    color={item.product.color}
                                    qty={item.qty}
                                    id={item.product.id}
                                />
                            </li>
                        ))}
                    </ul>
                    <div className="space-y-2">
                        <p>Total amount:
                            <span className="font-semibold mx-2">Rs. {new Intl.NumberFormat('en-US').format(subtotal)}</span>
                        </p>
                        <p className="text-sm dark:text-gray-600">Not including taxes and shipping costs</p>
                    </div>
                    <div className="flex justify-start space-x-4">
                        <Link href={session.status == "authenticated" ? "/checkout" : "/auth/sign-in"}
                              className={buttonVariants({variant: "default"})}>Checkout</Link>
                        <Button
                            disabled={clearCartMutation.isPending}
                            onClick={() => {
                                if (!session.data) {
                                    clearCartClient();
                                    toast.success("Cart has been Cleared!")
                                    window.location.reload()
                                } else {
                                    clearCartMutation.mutate();
                                    toast.success("Cart has been Cleared!")
                                }
                            }}>{clearCartMutation.isPending ? <LoadingSpinner/> : "Clear Cart"}</Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ShoppingCart;