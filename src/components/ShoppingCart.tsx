import React from 'react';
import {Button} from "@/components/ui/button";
import CartItem from "@/components/CartItem";

const ShoppingCart = () => {
    return (
        <div
            className="flex flex-col p-8 space-y-4 sm:p-10 dark:bg-gray-50 dark:text-gray-800 container mx-auto">
            <h2 className="text-xl font-semibold">Your cart</h2>
            <ul className="flex flex-col divide-y dark:divide-gray-300">
                <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
                    <CartItem></CartItem>
                </li><li className="flex flex-col py-6 sm:flex-row sm:justify-between">
                    <CartItem></CartItem>
                </li><li className="flex flex-col py-6 sm:flex-row sm:justify-between">
                    <CartItem></CartItem>
                </li>
                <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
                    <CartItem></CartItem>
                </li>
            </ul>
            <div className="space-y-2">
                <p>Total amount:
                    <span className="font-semibold mx-2">357 €</span>
                </p>
                <p className="text-sm dark:text-gray-600">Not including taxes and shipping costs</p>
            </div>
            <div className="flex justify-start space-x-4">
                <Button>Checkout</Button>
            </div>
        </div>
    );
};

export default ShoppingCart;