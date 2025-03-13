import React from 'react';
import ProductOverview from "@/components/ProductOverview";
import ReviewsContainer from "@/components/ReviewsContainer";

const Page = async ({params} : {params: {slug: string | undefined}}) => {
    const {slug} = await (params)
    return (
        <div>
            <ProductOverview slug={slug as string}/>
            <div className="container mx-auto">
                <ReviewsContainer />
            </div>
        </div>
    );
};

export default Page;