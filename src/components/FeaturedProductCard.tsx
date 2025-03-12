import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCardType } from "@/utils/types";
import Image from "next/image";

const FeaturedProductCard = (props: ProductCardType) => {
    const { name, price, img, slug, avlSizes, colors } = props;
    return (
        <div>
            <div className="relative group">
                <div className="overflow-hidden aspect-w-1 aspect-h-1">
                    <Image
                        className="mx-auto aspect-auto w-auto h-72 dark:hidden transition-all duration-300 group-hover:scale-125"
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
                </div>
            </div>
            <div className={"my-5 w-full"}>
                <Button className={"w-full"}>Add to Cart</Button>
            </div>
        </div>
    );
};

export default FeaturedProductCard;
