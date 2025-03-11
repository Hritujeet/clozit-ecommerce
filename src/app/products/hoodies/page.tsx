import React from 'react';
import ProductGrid from "@/components/ProductGrid";

const Page = () => {
    return (
        <div>
            <ProductGrid fetchURL={"/api/products/category/Hoodies"}  title={"Modish Hoodies | Clozit"} />
        </div>
    );
};

export default Page;