import React from 'react';
import ProductGrid from "@/components/ProductGrid";

const Page = () => {
    return (
        <div>
            <ProductGrid fetchURL={"/api/products/category/Bottoms"}  title={"Premium Bottoms | Clozit"} />
        </div>
    );
};

export default Page;