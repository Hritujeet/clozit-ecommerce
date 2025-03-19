"use client";
import React, {useState} from "react";
import {FaExchangeAlt, FaLock, FaShippingFast, FaShoppingCart,} from "react-icons/fa";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Skeleton} from "./ui/skeleton";
import Link from "next/link";
import toast from "react-hot-toast";
import {useSession} from "next-auth/react";
import {addToCartClient} from "@/utils/cart-client";
import LoadingSpinner from "@/components/LoadingSpinner";
import {addToCartServer} from "@/actions/cart.actions";
import {CartDataClient, CartDataServer} from "@/utils/types";

const ProductOverview = ({slug}: { slug: string }) => {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const session = useSession();
    const queryClient = useQueryClient();

    const query = useQuery({
        queryFn: async () => {
            const response = await fetch(`/api/products/product/${slug}`);
            const data = await response.json();
            return data;
        },
        queryKey: ["product"],
    });

    const mutation = useMutation({
        mutationFn: async (data: CartDataServer) => {
            await addToCartServer(data)
            return "hello"
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["cart"]})
            toast.success(
                "Product has been added to Cart"
            )
        }
    })

    if (query.isFetching) {
        return (
            <div className="space-y-4 w-[90vw] mx-auto">
                <Skeleton className="h-[40vh] w-full"/>
                <Skeleton className="h-[10vh] w-full"/>
                <Skeleton className="h-[20vh] w-full"/>
            </div>
        );
    }

    if (!query.isFetching && query.data?.error) {
        return (
            <div
                className={
                    "p-10 h-[90vh] bg-neutral-100 flex flex-col items-center gap-2 justify-center"
                }
            >
                <h1 className="text-[10rem] border-b border-neutral-400 py-5 font-bold">
                    404
                </h1>
                <h4 className="text-2xl py-5 font-semibold text-neutral-600">
                    Page Not Found
                </h4>
                <Link href={"/"}>
                    <Button className={"cursor-pointer"} size={"lg"}>
                        Go to Home
                    </Button>
                </Link>
            </div>
        );
    }

    if (!query.isFetching && !query.data?.error) {
        return (
            <div className="container mx-auto p-4 my-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="rounded-lg overflow-hidden shadow-lg max-h-[70vh] md:max-w-[35vw]">
                        <Image
                            width={500}
                            height={500}
                            src={query.data.product.image}
                            alt={query.data.product.productName}
                            className="w-full h-full max-h-[70vh] md:max-w-[35vw] object-contain aspect-square"
                        />
                    </div>
                    <div className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">
                                {query.data.product.productName}
                            </h1>
                            <div className="mb-4">
                                <p className="text-gray-600 my-4">
                                    {query.data.product.description}
                                </p>
                                <div className="flex space-x-2 my-2">
                                    {query.data.product.sizes.map(
                                        (size: string) => (
                                            <button
                                                key={size}
                                                className={`px-3 py-2 border rounded-md transition-colors ${
                                                    selectedSize === size
                                                        ? "bg-neutral-200"
                                                        : "hover:bg-gray-100"
                                                }`}
                                                onClick={() =>
                                                    setSelectedSize(size)
                                                }
                                            >
                                                {size}
                                            </button>
                                        )
                                    )}
                                </div>
                                <div className="flex space-x-2 my-2">
                                    {query.data.product.colors.map(
                                        (color: string) => (
                                            <button
                                                key={color}
                                                className={`p-2 border rounded-full transition-colors ${
                                                    color === selectedColor
                                                        ? "bg-neutral-200 text-white"
                                                        : "hover:bg-gray-100"
                                                }`}
                                                onClick={() =>
                                                    setSelectedColor(color)
                                                }
                                            >
                                                <div
                                                    key={color}
                                                    className={`w-6 h-6 rounded-full cursor-default ${
                                                        color.toLowerCase() ==
                                                        "white"
                                                            ? "border border-neutral-400"
                                                            : ""
                                                    }`}
                                                    style={{
                                                        backgroundColor: color,
                                                    }}
                                                    title={color} // Optional: shows color name on hover
                                                />
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center gap-4">
                            <p className="text-2xl font-semibold mb-4">
                                ${query.data.product.price}
                            </p>
                            <Button
                                disabled={mutation.isPending}
                                onClick={() => {
                                    if (selectedColor && selectedSize) {
                                        if (session?.data) {
                                            // use mutation using cart server actions
                                            const cartData: CartDataServer = {
                                                email: session.data.user?.email as string,
                                                productId:
                                                query.data.product._id as string,
                                                color: selectedColor,
                                                size: selectedSize,
                                                price: query.data.product.price as number
                                            };
                                            mutation.mutate(cartData)
                                        } else {
                                            // call utility function from utils.ts to add to local storage
                                            const cartData: CartDataClient = {
                                                id: query.data.product._id,
                                                name: query.data.product
                                                    .productName,
                                                color: selectedColor,
                                                size: selectedSize,
                                                price: query.data.product.price,
                                                slug: query.data.product.slug
                                            };
                                            addToCartClient(cartData)
                                            toast.success(
                                                "Product has been added to Cart"
                                            );
                                        }

                                        setSelectedColor(null);
                                        setSelectedSize(null);
                                    } else {
                                        toast.error(
                                            "Please select color and size"
                                        );
                                    }
                                }}
                            >
                                {mutation.isPending ? <LoadingSpinner/> : <><FaShoppingCart className="mr-2"/> Add to
                                    Cart</>}
                            </Button>
                            <Button variant={"outline"}>Buy Now</Button>
                        </div>
                        <div className="mt-6 space-y-2">
                            <div className="flex items-center">
                                <FaShippingFast className="mr-2 text-gray-600"/>
                                <span>Free Shipping</span>
                            </div>
                            <div className="flex items-center">
                                <FaExchangeAlt className="mr-2 text-gray-600"/>
                                <span>30-Day Return Policy</span>
                            </div>
                            <div className="flex items-center">
                                <FaLock className="mr-2 text-gray-600"/>
                                <span>Secure Payment</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ProductOverview;
