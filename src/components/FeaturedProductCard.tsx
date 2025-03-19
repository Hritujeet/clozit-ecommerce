import React from "react";
import Link from "next/link";
import { ProductCardType } from "@/utils/types";
import Image from "next/image";

const FeaturedProductCard = (props: ProductCardType) => {
    const { name, price, img, slug, avlSizes, colors } = props;
    return (
        <div>
            <div className="relative group shadow-md px-4 py-2 rounded-lg h-full flex flex-col justify-between min-h-[50vh] ">
                <div className="overflow-hidden aspect-w-1 aspect-h-1">
                    <Image
                        className="mx-auto aspect-auto w-auto h-60 md:h-72 dark:hidden transition-all duration-300 group-hover:scale-125"
                        src={img}
                        alt="product-image"
                        width={200}
                        height={200}
                        objectFit="contain"
                    />
                </div>
                <div className="flex flex-col items-start justify-between mt-4 space-x-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">
                            <Link href={`/products/products/${slug}`} title="">
                                {name}
                                <span
                                    className="absolute inset-0"
                                    aria-hidden="true"
                                ></span>
                            </Link>
                        </h3>
                    </div>

                    <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                            ${price}
                        </p>
                    </div>

                    <div className="font-semibold text-sm text-neutral-600 flex gap-5 my-2">
                        {avlSizes.map((size) => {
                            return (
                                <div
                                    key={size}
                                    className="cursor-default p-1 border rounded"
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
                </div>
            </div>
        </div>
    );
};

export default FeaturedProductCard;
