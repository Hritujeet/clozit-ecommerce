import React from 'react';
import ProductOverview from "@/components/ProductOverview";
import ReviewsContainer from "@/components/ReviewsContainer";

const Page = () => {
    return (
        <div>
            <ProductOverview />
            <div className="container mx-auto">
                <ReviewsContainer />
            </div>
        </div>
    );
};

export default Page;