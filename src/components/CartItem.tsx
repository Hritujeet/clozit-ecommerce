"use client"
import React from "react";
import {Button} from "@/components/ui/button";
import {MinusCircle, PlusCircle} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment} from "@/redux/slice/counter";
import {RootState} from "@/redux/store";

type CartItemProps = {
    name: string,
    color: string,
    size: string,
    price: string,
    slug: string
}

const CartItem = () => {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div className="flex w-full items-center space-x-2 sm:space-x-4">
            <div className="flex flex-col justify-between w-full pb-4">
                <div className="flex justify-between w-full pb-2 space-x-2">
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                            Name
                        </h3>
                        <p className="text-sm dark:text-gray-600">Classic</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-semibold">59.99€</p>
                        <p className="text-sm line-through dark:text-gray-400">
                            75.50€
                        </p>
                    </div>
                </div>
                <div className="flex text-sm gap-3 items-center">
                    <Button
                        variant={"secondary"}
                        size={"icon"}
                        className="flex justify-center items-center px-2 py-1"
                        onClick={() => {
                            dispatch(increment())
                        }}
                    >
                        <PlusCircle/>
                    </Button>
                    <span className={"font-semibold"}>{count}</span>
                    <Button
                        variant={"secondary"}
                        size={"icon"}
                        className="flex justify-center items-center px-2 py-1"
                        onClick={() => {
                            dispatch(decrement())
                        }}
                    >
                        <MinusCircle/>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
