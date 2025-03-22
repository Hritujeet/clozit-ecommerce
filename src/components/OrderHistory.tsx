import React from "react";

const OrderHistory = () => {
    return (
        <section className="py-24 relative">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid ld:grid-cols-2 gap-2 grid-cols-1">
                    <div className="border rounded-md px-6 py-4 border-gray-200">
                        <div className="flex max-sm:flex-col items-center justify-between mb-3">
                            <h3 className="font-manrope font-bold text-2xl leading-9 text-black flex justify-center items-center gap-2">
                                Purchase Items <span className="font-normal">4</span>
                            </h3>
                            <p className="font-medium text-lg leading-8 text-gray-500">
                                Order # 91256800100
                            </p>
                        </div>
                        <div className="flex max-sm:flex-col items-center justify-between">
                            <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                                $150.00
                            </h2>
                            <p className="font-medium text-lg leading-8 text-gray-500">
                                Shipped
                            </p>
                        </div>
                    </div>
                    <div className="border rounded-md px-6 py-4 border-gray-200">
                        <div className="flex max-sm:flex-col items-center justify-between mb-3">
                            <h3 className="font-manrope font-bold text-2xl leading-9 text-black flex justify-center items-center gap-2">
                                Purchase Items <span className="font-normal">4</span>
                            </h3>
                            <p className="font-medium text-lg leading-8 text-gray-500">
                                Order # 91256800100
                            </p>
                        </div>
                        <div className="flex max-sm:flex-col items-center justify-between">
                            <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                                $150.00
                            </h2>
                            <p className="font-medium text-lg leading-8 text-gray-500">
                                Shipped
                            </p>
                        </div>
                    </div>
                    <div className="border rounded-md px-6 py-4 border-gray-200">
                        <div className="flex max-sm:flex-col items-center justify-between mb-3">
                            <h3 className="font-manrope font-bold text-2xl leading-9 text-black flex justify-center items-center gap-2">
                                Purchase Items <span className="font-normal">4</span>
                            </h3>
                            <p className="font-medium text-lg leading-8 text-gray-500">
                                Order # 91256800100
                            </p>
                        </div>
                        <div className="flex max-sm:flex-col items-center justify-between">
                            <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                                $150.00
                            </h2>
                            <p className="font-medium text-lg leading-8 text-gray-500">
                                Shipped
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderHistory;
