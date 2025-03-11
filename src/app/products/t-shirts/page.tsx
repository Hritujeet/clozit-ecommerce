import React from 'react';
import ProductGrid from "@/components/ProductGrid";

const Page = () => {
    return (
        <div>
            <ProductGrid fetchURL={"/api/products/category/T-Shirts"}  title={"Stunning T-Shirts | Clozit"} />
        </div>
    );
};

export default Page;