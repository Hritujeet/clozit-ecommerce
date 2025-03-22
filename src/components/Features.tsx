"use client"
import React from 'react';

const Features = () => {
    return (
        <div>
            <section>
                <div className="container max-w-xl p-6 mx-auto space-y-12 lg:px-8 lg:max-w-7xl">
                    <div>
                        <h2 className="text-3xl font-bold text-center sm:text-5xl">Perks Of Shopping at Clozit</h2>
                        <p className="max-w-3xl mx-auto mt-4 text-xl text-center">
                            Shop from the comfort of your home | Latest trends | Fast delivery
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div>
                            <div className="mt-4 space-y-12">
                                <div className="flex border p-5 cursor-default rounded-md">
                                    <div className="ml-4">
                                        <h4 className="text-lg font-semibold">Fast Delivery</h4>
                                        <p className="mt-2">
                                            Enjoy swift and hassle-free delivery to your doorstep, ensuring a smooth shopping experience.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex border p-5 cursor-default rounded-md">
                                    <div className="ml-4">
                                        <h4 className="text-lg font-semibold">Trendy Outfits of the Season</h4>
                                        <p className="mt-2">
                                            Shop from the latest trends of the season, ensuring you stay ahead of the fashion curve.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Features;