"use client"
import React, {useState} from 'react';
import {FaExchangeAlt, FaHeart, FaLock, FaShippingFast, FaShoppingCart, FaStar} from 'react-icons/fa';
import Image from "next/image";
import {Button} from "@/components/ui/button";

const ProductOverview = () => {
    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null)

    const product = {
        image: 'https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/450ed1df-8e17-4d87-a244-85697874661c/NIKE+REVOLUTION+7.png',
        title: 'Premium Running Shoes',
        rating: 4.5,
        price: 129.99,
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci deserunt eveniet illo labore necessitatibus qui sit. Atque culpa dolorum inventore nobis voluptatibus? Accusantium amet architecto aspernatur aut beatae cum deleniti dolor doloribus eligendi eum explicabo facilis fuga fugit illum iste necessitatibus non obcaecati, odit perspiciatis reiciendis sint sit vero voluptas.',
        sizes: [7, 8, 9, 10, 11],
        colors: ["Bright Red", "Deep Green", "Navy Blue"]
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="rounded-lg overflow-hidden shadow-lg">
                    <Image
                        width={500}
                        height={500}
                        src={product.image}
                        alt={product.title}
                        className="w-full max-h-[80vh] object-cover"
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                        <div className="flex items-center mb-2">
                            <FaStar className="text-yellow-400 mr-1"/>
                            <span>{product.rating}</span>
                        </div>
                        <p className="text-2xl font-semibold mb-4">${product.price}</p>
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold mb-2">Select Size:</h2>
                            <div className="flex space-x-2 my-2">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`px-3 py-2 border rounded-md transition-colors ${selectedSize === size ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            <div className="flex space-x-2 my-2">
                                {product.colors.map((color) => (
                                    <button
                                        key={color}
                                        className={`px-3 py-2 border rounded-md transition-colors ${color === selectedColor ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                                        onClick={() => setSelectedColor(color)}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                            <p className="text-gray-600 my-4">{product.desc}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-4">
                        <Button>
                            <FaShoppingCart className="mr-2"/> Add to Cart
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
};

export default ProductOverview;