import React from 'react';
import ProductOverview from "@/components/ProductOverview";

const Page = async ({params}: { params: { slug: string | undefined } }) => {
    const {slug} = await (params)

    return (
        <div>
            <ProductOverview slug={slug as string}/>
        </div>
    );
};

export default Page;