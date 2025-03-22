import Order from "@/components/Order";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
    const {id} = await params
    
    return (
        <div>
            <Order orderId={id} />
        </div>
    );
};

export default Page;
