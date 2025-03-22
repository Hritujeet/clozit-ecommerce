"use client";
import React from "react";
import FeaturedProductCard from "@/components/FeaturedProductCard";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/utils/types";
import ProductSkeleton from "./ProductSkeleton";

const FeaturedProducts = () => {
    const {data, isFetching} = useQuery({ 
        queryFn: async () => {
            const response = await fetch("/api/products/featured");
            if (!response.ok) throw new Error("Failed to fetch products");
            return response.json();
        },
        queryKey: ["featured-products"],
    });
    
    return (
        <section className="py-12 bg-white sm:py-16 lg:py-20" suppressHydrationWarning>
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-md mx-auto text-center">
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        Our featured items
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4 aspect-auto">
                {isFetching
                        ? Array.from({length: 4}).map((_, index) => <ProductSkeleton key={index}/>)
                        : data.products.map((item: Product, index: number) => (
                            <FeaturedProductCard
                                key={index}
                                name={item.productName}
                                img={item.image}
                                discount={45}
                                price={item.price}
                                slug={item.slug}
                                avlSizes={item.sizes}
                                colors={item.colors}
                            />
                        ))}
                </div>
            </div>
        </section>
    );
};
export default FeaturedProducts;
