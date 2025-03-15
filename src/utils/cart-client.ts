// Deal with local storage transactions here for unauthenticatd users here

import {CartDataClient} from "@/utils/types";

export const addToCartClient = (data: CartDataClient) => {
    const localCart: CartDataClient[] = JSON.parse(localStorage.getItem("Cart") || "[]");
    localCart.push({...data});
    localStorage.setItem("Cart", JSON.stringify(localCart));

    console.log("Updated Cart:", localCart);
};


export const removeFromCartClient = () => {

}

export const clearCartClient = () => {
    localStorage.removeItem("Cart")
}