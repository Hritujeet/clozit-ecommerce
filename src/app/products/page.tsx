import React from 'react';
import ProductGrid from "@/components/ProductGrid";

const Page = () => {
    return (
        <div>
            <ProductGrid fetchURL={"/api/products/all-products"} title={"Trendy Outfits | Clozit"}/>
        </div>
    );
};

export default Page;