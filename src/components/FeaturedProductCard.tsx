import React from 'react';
import Link from "next/link";
import {Button} from "@/components/ui/button";

const FeaturedProductCard = () => {
    return (
        <div>
            <div className="relative group">
                <div className="overflow-hidden aspect-w-1 aspect-h-1">
                    <img className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                         src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-1.png"
                         alt=""/>
                </div>
                <div className="flex items-start justify-between mt-4 space-x-4">
                    <div>
                        <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                            <Link href="/products/products/clozit" title="">
                                Beoplay M5 Bluetooth Speaker
                                <span className="absolute inset-0" aria-hidden="true"></span>
                            </Link>
                        </h3>
                    </div>

                    <div className="text-right">
                        <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">$99.00</p>
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