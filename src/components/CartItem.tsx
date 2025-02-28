import React from 'react';
import {Button} from "@/components/ui/button";
import {MinusCircle, PlusCircle} from "lucide-react";

const CartItem = () => {
    return (
        <div className="flex w-full space-x-2 sm:space-x-4">
            <img
                className="flex-shrink-0 object-cover w-20 h-20 dark:border- rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80"
                alt="Polaroid camera"/>
            <div className="flex flex-col justify-between w-full pb-4">
                <div className="flex justify-between w-full pb-2 space-x-2">
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold leading-snug sm:pr-8">Polaroid camera</h3>
                        <p className="text-sm dark:text-gray-600">Classic</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-semibold">59.99€</p>
                        <p className="text-sm line-through dark:text-gray-400">75.50€</p>
                    </div>
                </div>
                <div className="flex text-sm gap-3 items-center">
                    <Button size={"icon"} className="flex justify-center items-center px-2 py-1">
                        <PlusCircle/>
                    </Button>
                    <span className={"font-semibold"}>2</span>
                    <Button size={"icon"} className="flex justify-center items-center px-2 py-1">
                        <MinusCircle/>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;