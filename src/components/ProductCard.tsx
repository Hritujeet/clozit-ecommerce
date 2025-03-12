import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { ProductCardType } from "@/utils/types";

const ProductCard = (props: ProductCardType) => {
    const { name, price, img, slug, avlSizes, colors } = props;

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="h-60 w-full">
                <Link href={`/products/products/${slug}`}>
                    <Image
                        className="mx-auto aspect-auto w-auto h-full dark:hidden"
                        src={img}
                        alt="product-image"
                        width={200}
                        height={200}
                        objectFit="contain"
                    />
                </Link>
            </div>
            <div className="pt-6">
                <Link
                    href={`/products/products/${slug}`}
                    className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                >
                    {name}
                </Link>

                <div className="font-semibold text-sm text-neutral-600 flex gap-5 my-2">
                    {avlSizes.map((size) => {
                        return (
                            <div
                                key={size}
                                className="cursor-default p-1 border rounded aspect-square flex justify-center items-center"
                            >
                                {size}
                            </div>
                        );
                    })}
                </div>
                <div className="flex gap-2 my-2">
                    {colors.map((color) => {
                        return (
                            <div
                                key={color}
                                className={`w-6 h-6 rounded-full cursor-default ${
                                    color.toLowerCase() == "white"
                                        ? "border border-neutral-400"
                                        : ""
                                }`}
                                style={{ backgroundColor: color }}
                                title={color} // Optional: shows color name on hover
                            />
                        );
                    })}
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                    <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
                        ${price}
                    </p>
                    <Button>
                        <ShoppingCartIcon />
                        Add to cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
