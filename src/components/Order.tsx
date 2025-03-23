"use client";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, HouseIcon, StoreIcon, TruckIcon } from "lucide-react";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import Image from "next/image";

const Order = ({ orderId }: { orderId: string }) => {
    const query = useQuery({
        queryFn: async () => {
            const response = await fetch(`/api/orders/fetch-orders/${orderId}`);
            const data = await response.json();
            return data;
        },
        queryKey: ["order-details"],
    });

    const statusSteps = [
        "Order Placed",
        "Shipped",
        "Out for Delivery",
        "Delivered",
    ];
    const currentStatus = query.data?.order.status;
    const statusIndex = statusSteps.indexOf(currentStatus);

    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900">
            {query.isFetching && (
                <div className="w-[85vw] mx-auto flex gap-2 justify-between">
                    <Skeleton className="h-[60vh] w-[40vw]" />
                    <Skeleton className="h-[60vh] w-[40vw]" />
                </div>
            )}
            {!query.isFetching && (
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                        Tracking Order{" "}
                        <span className="text-green-600 font-semibold">
                            #{orderId}
                        </span>
                    </h2>

                    <div className="mt-6 sm:mt-8 flex flex-col lg:flex-row items-stretch lg:gap-8">
                        <div className="w-full divide-y divide-gray-200 overflow-hidden lg:max-w-xl xl:max-w-2xl">
                            {query.data?.order.orderItems.map(
                                (element: any, index: number) => (
                                    <div key={index} className="space-y-4 p-6">
                                        <div className="flex items-center gap-6">
                                            <Link
                                                href={`/products/products/${element.product.slug}`}
                                                className="w-auto h-32 shrink-0"
                                            >
                                                <Image
                                                    width={100}
                                                    height={100}
                                                    className="h-full w-full dark:hidden"
                                                    src={element.product.image}
                                                    alt="Product image"
                                                />
                                            </Link>
                                            <div className="flex-flex-col gap-2">
                                                <Link
                                                    href={`/products/products/${element.product.slug}`}
                                                    className="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"
                                                >
                                                    {
                                                        element.product
                                                            .productName
                                                    }
                                                </Link>
                                                <p className="text-neutral-400">
                                                    {
                                                        element.product
                                                            .description
                                                    }
                                                </p>
                                                <div className="flex gap-3 items-center">
                                                    <span className="border rounded-md cursor-default px-2 py-1">
                                                        {element.color}
                                                    </span>
                                                    <span className="border rounded-md cursor-default px-2 py-1">
                                                        {element.size}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between gap-4">
                                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    Quantity
                                                </span>{" "}
                                                {element.quantity}
                                            </p>
                                            <div className="flex items-center justify-end gap-4">
                                                <p className="text-xl font-semibold leading-tight text-gray-900 dark:text-white">
                                                    Rs.{" "}
                                                    {new Intl.NumberFormat(
                                                        "en-US"
                                                    ).format(
                                                        element.product.price
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                            <div className="space-y-4 bg-gray-50 p-6 dark:bg-gray-800">
                                <dl className="flex items-center justify-between gap-4 pt-2">
                                    <dt className="text-lg font-bold text-gray-900 dark:text-white">
                                        Total
                                    </dt>
                                    <dd className="text-xl font-bold text-gray-900 dark:text-white">
                                        Rs.{" "}
                                        {new Intl.NumberFormat("en-US").format(
                                            query.data.order.total
                                        )}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <div className="mt-6 grow sm:mt-8 lg:mt-0">
                            <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Order Status
                                </h3>
                                <ol className="relative ms-3 border-s border-gray-200 dark:border-gray-700">
                                    {statusSteps.map((status, index) => (
                                        <li
                                            key={status}
                                            className={`mb-10 ms-6 ${
                                                index <= statusIndex
                                                    ? "text-green-600"
                                                    : ""
                                            }`}
                                        >
                                            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                                {status === "Order Placed" && (
                                                    <HouseIcon />
                                                )}
                                                {status === "Shipped" && (
                                                    <StoreIcon />
                                                )}
                                                {status ===
                                                    "Out for Delivery" && (
                                                    <TruckIcon />
                                                )}
                                                {status === "Delivered" && (
                                                    <CheckCircle />
                                                )}
                                            </span>
                                            <h4 className="mb-0.5 text-base font-semibold">
                                                {status}
                                            </h4>
                                            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                {status === "Order Placed" &&
                                                    "Your order has been placed successfully."}
                                                {status === "Shipped" &&
                                                    "The item has been shipped to your nearest hub."}
                                                {status ===
                                                    "Out for Delivery" &&
                                                    "The item is out for delivery."}
                                                {status === "Delivered" && (
                                                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                        {query.data.order
                                                            .status ===
                                                        "Delivered" ? (
                                                            <span className="font-semibold text-green-600">
                                                                Your order was
                                                                delivered on{" "}
                                                                {new Date(
                                                                    query.data?.order.deliveryDate
                                                                ).toLocaleString(
                                                                    "en-US",
                                                                    {
                                                                        year: "numeric",
                                                                        month: "long",
                                                                        day: "numeric",
                                                                    }
                                                                )}
                                                            </span>
                                                        ) : (
                                                            `Delivery Estimated by ${new Date(
                                                                query.data?.order.deliveryDate
                                                            ).toLocaleString(
                                                                "en-US",
                                                                {
                                                                    year: "numeric",
                                                                    month: "long",
                                                                    day: "numeric",
                                                                }
                                                            )}`
                                                        )}
                                                    </p>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Order;
