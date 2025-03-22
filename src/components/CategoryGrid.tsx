"use client"
import React from "react";
import Link from "next/link";

const CategoryGrid = () => {
    const categories = [
        {
            title: "T-Shirts",
            url: "/products/t-shirts",
            image: "https://assets.ajio.com/medias/sys_master/root/20240902/0l5d/66d5d1291d763220fab8a48b/-473Wx593H-465914828-multi-MODEL.jpg",
        },
        {
            title: "Hoodies",
            url: "/products/hoodies",
            image: "https://thalasiknitfab.com/cdn/shop/files/luffyhoodie-1_WHITEBG_490x.progressive.jpg?v=1731753749",
        },
        {
            title: "Bottoms",
            url: "/products/bottoms",
            image: "https://thestreetsofseoul.com/cdn/shop/files/Padded-Winter-Cargo-Pants-thestreetsofseoul-korean-street-style-minimal-streetwear-k-style-kstyle-mens-affordable-clothing.webp?v=1732635531&width=1280",
        },
        {
            title: "Winter Wear",
            url: "/products/winter-wear",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpMipDdqb7HU_wKzhPqeDfHZQ0vN8OBBgAsg&s",
        }
    ];

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                <h2 className="text-3xl text-center mb-5 font-bold text-gray-900">Collections</h2>

                <div className="mt-6 grid gap-y-12 gap-x-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 justify-center">
                    {categories.map((category, index) => (
                        <div key={index} className="group relative">
                            <img
                                src={category.image}
                                alt={category.title}
                                className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 duration-150 h-[40vh] object-top sm:aspect-2/1 lg:aspect-square"
                            />
                            <h3 className="mt-4 text-xl font-semibold text-gray-500">
                                <Link href={category.url}>
                                    <span className="absolute inset-0"></span>
                                    {category.title}
                                </Link>
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryGrid;
