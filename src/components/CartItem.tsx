"use client"
import React from "react";
import {Button} from "@/components/ui/button";
import {MinusCircle, PlusCircle} from "lucide-react";
import {useSession} from "next-auth/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addToCartServer, removeFromCartServer} from "@/actions/cart.actions";
import {CartDataClient, CartDataServer} from "@/utils/types";
import {addToCartClient, removeFromCartClient} from "@/utils/cart-client";
import LoadingSpinner from "@/components/LoadingSpinner";
import toast from "react-hot-toast";

type CartItemProps = {
    name: string,
    color: string,
    size: string,
    price: number,
    slug: string,
    qty: number,
    id: string
}

const CartItem = (props: CartItemProps) => {
    const session = useSession();
    const queryClient = useQueryClient();

    const addMutation = useMutation({
        mutationFn: async () => {
            if (session.status == "authenticated") {
                // Update cart on server when logged in
                const data = {
                    email: session.data.user?.email as string,
                    color: props.color,
                    price: props.price,
                    size: props.size,
                    productId: props.id
                } as CartDataServer;
                await addToCartServer(data);
            } else {
                // Update cart in local storage when not logged in
                const data = {
                    id: props.id,
                    name: props.name,
                    color: props.color,
                    size: props.size,
                    price: props.price,
                    slug: props.slug
                } as CartDataClient;
                addToCartClient(data);
            }
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["cart"]});
            toast.success("Product added to cart");
        }
    });

    const removeMutation = useMutation({
        mutationFn: async () => {
            if (session.status == "authenticated") {
                // Update cart on server when logged in
                const data = {
                    email: session.data.user?.email as string,
                    color: props.color,
                    price: props.price,
                    size: props.size,
                    productId: props.id
                } as CartDataServer;
                await removeFromCartServer(data);
            } else {
                // Update cart in local storage when not logged in
                const data = {
                    id: props.id,
                    name: props.name,
                    color: props.color,
                    size: props.size,
                    price: props.price,
                    slug: props.slug
                } as CartDataClient;
                removeFromCartClient(data);
            }
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["cart"]});
            toast.success("Product removed from cart");
        }
    });

    return (
        <div
            className="flex justify-between aspect-auto w-full items-center space-x-2 sm:space-x-4 shadow-lg py-4 px-6 rounded-md">
            <div className="flex flex-col justify-between w-full pb-4">
                <div className="flex justify-between w-full pb-2 space-x-2">
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                            {props.name}
                        </h3>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-semibold">${props.price}</p>
                        <p className="text-sm line-through dark:text-gray-400">
                            75.50€
                        </p>
                    </div>
                </div>
                <div className="flex text-sm gap-3 items-center">
                    <Button
                        size={"icon"}
                        className="flex justify-center items-center px-2 py-1"
                        disabled={addMutation.isPending || removeMutation.isPending}
                        onClick={() => {
                            addMutation.mutate()
                        }}
                    >
                        {removeMutation.isPending || addMutation.isPending ? <LoadingSpinner/> : <PlusCircle/>}
                    </Button>
                    <span className={"font-semibold"}>{props.qty}</span>
                    <Button
                        size={"icon"}
                        className="flex justify-center items-center px-2 py-1"
                        disabled={removeMutation.isPending || addMutation.isPending}
                        onClick={() => {
                            removeMutation.mutate()
                        }}
                    >
                        {removeMutation.isPending || addMutation.isPending ? <LoadingSpinner/> : <MinusCircle/>}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;