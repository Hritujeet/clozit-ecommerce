import React from 'react';
import OrderDetails from "@/components/OrderDetails";
import OrderSummary from "@/components/OrderSummary";

const Page = () => {
    return (
        <div className={"flex flex-col items-center md:flex-row w-[90vw] mx-auto mt-10 gap-6"}>
            <OrderDetails />
            <OrderSummary />
        </div>
    );
};

export default Page;