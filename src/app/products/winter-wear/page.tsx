import React from 'react';
import ProductGrid from "@/components/ProductGrid";

const Page = () => {
    return (
        <div>
            <ProductGrid fetchURL={"/api/products/category/Winter Wear"} title={"Trendy Winter Wear | Clozit"} />
        </div>
    );
};

export default Page;