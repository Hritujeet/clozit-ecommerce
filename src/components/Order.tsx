"use client";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, HouseIcon, StoreIcon, TruckIcon } from "lucide-react";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

interface Product {
    _id: string;
    productName: string;
    description: string;
    price: number;
    image: string;
    slug: string;
}

interface OrderItem {
    _id: string;
    quantity: number;
    color: string;
    size: string;
    product: Product;
}

interface OrderData {
    _id: string;
    status: 'Order Placed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
    total: number;
    deliveryDate: string;
    orderItems: OrderItem[];
}

interface OrderResponse {
    order: OrderData;
}

const Order = ({ orderId }: { orderId: string }) => {
    const query = useQuery<OrderResponse>({
        queryFn: async () => {
            const response = await fetch(`/api/orders/fetch-orders/${orderId}`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to fetch order details');
            }
            const data = await response.json();
            return data;
        },
        queryKey: ["order-details", orderId],
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });

    const statusSteps: Array<'Order Placed' | 'Shipped' | 'Out for Delivery' | 'Delivered'> = [
        "Order Placed",
        "Shipped", 
        "Out for Delivery",
        "Delivered",
    ];
    
    const currentStatus = query.data?.order?.status;
    const statusIndex = currentStatus ? statusSteps.indexOf(currentStatus) : -1;

    if (query.isFetching) {
        return (
            <section className="bg-white py-8 antialiased dark:bg-gray-900">
                <div className="w-[85vw] mx-auto flex gap-2 justify-between">
                    <Skeleton className="h-[60vh] w-[40vw]" />
                    <Skeleton className="h-[60vh] w-[40vw]" />
                </div>
            </section>
        );
    }

    if (query.isError) {
        return (
            <section className="bg-white py-8 antialiased dark:bg-gray-900">
                <div className="text-center py-8">
                    <p className="text-red-500 mb-4">
                        {query.error instanceof Error ? query.error.message : 'Failed to load order details. Please try again.'}
                    </p>
                    <button 
                        onClick={() => query.refetch()}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </section>
        );
    }

    if (!query.data?.order) {
        return (
            <section className="bg-white py-8 antialiased dark:bg-gray-900">
                <div className="text-center py-8">
                    <p className="text-gray-500">No order data found.</p>
                </div>
            </section>
        );
    }

    const order = query.data.order;

    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                    Tracking Order{" "}
                    <span className="text-green-600 font-semibold">
                        #{orderId?.slice(-8) || 'N/A'}
                    </span>
                </h2>

                <div className="mt-6 sm:mt-8 flex flex-col lg:flex-row items-stretch lg:gap-8">
                    <div className="w-full divide-y divide-gray-200 overflow-hidden lg:max-w-xl xl:max-w-2xl">
                        {order.orderItems?.map((element, index) => (
                            <div key={element._id || index} className="space-y-4 p-6">
                                <div className="flex flex-row-reverse items-center gap-6">
                                    <div className="flex flex-col gap-2">
                                        <Link
                                            href={`/products/products/${element.product?.slug || '#'}`}
                                            className="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"
                                        >
                                            {element.product?.productName || 'Product Name'}
                                        </Link>
                                        <p className="text-neutral-400">
                                            {element.product?.description || 'No description available'}
                                        </p>
                                        <div className="flex gap-3 items-center">
                                            <span className="border rounded-md cursor-default px-2 py-1">
                                                {element.color || 'N/A'}
                                            </span>
                                            <span className="border rounded-md cursor-default px-2 py-1">
                                                {element.size || 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            Quantity
                                        </span>{" "}
                                        {element.quantity || 0}
                                    </p>
                                    <div className="flex items-center justify-end gap-4">
                                        <p className="text-xl font-semibold leading-tight text-gray-900 dark:text-white">
                                            Rs.{" "}
                                            {new Intl.NumberFormat("en-US").format(
                                                element.product?.price || 0
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="space-y-4 bg-gray-50 p-6 dark:bg-gray-800">
                            <dl className="flex items-center justify-between gap-4 pt-2">
                                <dt className="text-lg font-bold text-gray-900 dark:text-white">
                                    Total
                                </dt>
                                <dd className="text-xl font-bold text-gray-900 dark:text-white">
                                    Rs.{" "}
                                    {new Intl.NumberFormat("en-US").format(
                                        order.total || 0
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
                                                : "text-gray-400"
                                        }`}
                                    >
                                        <span className={`absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full ring-8 ring-white dark:ring-gray-800 ${
                                            index <= statusIndex 
                                                ? "bg-green-100 dark:bg-green-700" 
                                                : "bg-gray-100 dark:bg-gray-700"
                                        }`}>
                                            {status === "Order Placed" && <HouseIcon size={16} />}
                                            {status === "Shipped" && <StoreIcon size={16} />}
                                            {status === "Out for Delivery" && <TruckIcon size={16} />}
                                            {status === "Delivered" && <CheckCircle size={16} />}
                                        </span>
                                        <h4 className="mb-0.5 text-base font-semibold">
                                            {status}
                                        </h4>
                                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                            {status === "Order Placed" &&
                                                "Your order has been placed successfully."}
                                            {status === "Shipped" &&
                                                "The item has been shipped to your nearest hub."}
                                            {status === "Out for Delivery" &&
                                                "The item is out for delivery."}
                                            {status === "Delivered" && (
                                                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                    {order.status === "Delivered" ? (
                                                        <span className="font-semibold text-green-600">
                                                            Your order was delivered on{" "}
                                                            {order.deliveryDate 
                                                                ? new Date(order.deliveryDate).toLocaleString("en-US", {
                                                                    year: "numeric",
                                                                    month: "long", 
                                                                    day: "numeric",
                                                                })
                                                                : 'N/A'
                                                            }
                                                        </span>
                                                    ) : (
                                                        `Delivery Estimated by ${
                                                            order.deliveryDate
                                                                ? new Date(order.deliveryDate).toLocaleString("en-US", {
                                                                    year: "numeric",
                                                                    month: "long",
                                                                    day: "numeric",
                                                                })
                                                                : 'N/A'
                                                        }`
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
        </section>
    );
};

export default Order;