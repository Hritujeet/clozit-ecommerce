import React from 'react';
import ReviewCard from "@/components/ReviewCard";

export const ReviewsContainer = () => {
    return (
        <section className="py-24 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                <div className="w-full">
                    <h2 className="font-manrope font-bold text-4xl text-black mb-8 text-center">Our customer reviews
                    </h2>
                    <ReviewCard />
                    <ReviewCard />
                </div>
            </div>
        </section>

    );
};

export default ReviewsContainer;