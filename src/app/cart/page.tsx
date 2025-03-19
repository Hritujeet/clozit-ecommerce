import React from 'react';
import FeaturedProducts from "@/components/FeaturedProducts";
import ShoppingCart from "@/components/ShoppingCart";

const Page = () => {
    return (
        <div>
            <ShoppingCart></ShoppingCart>
            <div className="aspect-auto">
                <FeaturedProducts></FeaturedProducts>
            </div>
        </div>
    );
};

export default Page;