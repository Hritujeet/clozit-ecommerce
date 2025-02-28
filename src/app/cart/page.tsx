import React from 'react';
import FeaturedProducts from "@/components/FeaturedProducts";
import ShoppingCart from "@/components/ShoppingCart";

const Page = () => {
    return (
        <div>
            <ShoppingCart></ShoppingCart>
            <FeaturedProducts></FeaturedProducts>
        </div>
    );
};

export default Page;