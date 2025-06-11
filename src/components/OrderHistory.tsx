"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

const OrderHistory = () => {
    const query = useQuery({
        queryFn: async () => {
            const response = await fetch("/api/orders/fetch-orders");
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            return data;
        },
        queryKey: ["orders"],
    });

    return (
        <section className="py-24 relative">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                <h1 className="text-3xl font-bold text-center mb-8">Order History</h1>
                
                <div className="grid lg:grid-cols-2 gap-4 grid-cols-1">
                    {query.isFetching && (
                        <>
                            <Skeleton className="h-20" />
                            <Skeleton className="h-20" />
                            <Skeleton className="h-20" />
                        </>
                    )}

                    {query.isError && (
                        <div className="col-span-full text-center py-8">
                            <p className="text-red-500">Failed to load orders. Please try again.</p>
                        </div>
                    )}

                    {!query.isFetching && !query.isError && query.data?.orders?.length === 0 && (
                        <div className="col-span-full text-center py-8">
                            <p className="text-gray-500">No orders found.</p>
                        </div>
                    )}

                    {!query.isFetching && query.data?.orders?.map((element: any, index: number) => {
                        return (
                            <Link 
                                href={`/profile/orders/order/${element._id}`} 
                                key={element._id || index} 
                                className="border rounded-md px-6 py-4 border-gray-200 hover:bg-neutral-100 duration-150"
                            >
                                <div className="flex max-sm:flex-col items-center justify-between mb-3">
                                    <h3 className="font-manrope font-bold text-2xl leading-9 text-black flex justify-center items-center gap-2">
                                        Purchase Items{" "}
                                        <span className="font-normal">
                                            {element.orderItems?.length || 0}
                                        </span>
                                    </h3>
                                    <p className="font-medium text-lg leading-8 text-gray-500">
                                        Order #{element._id?.slice(-8) || 'N/A'}
                                    </p>
                                </div>
                                <div className="flex max-sm:flex-col items-center justify-between">
                                    <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                                        Rs. {new Intl.NumberFormat("en-US").format(element.total || 0)}
                                    </h2>
                                    <p className="font-medium text-lg leading-8 text-gray-500">
                                        {element.status || 'Pending'}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default OrderHistory;