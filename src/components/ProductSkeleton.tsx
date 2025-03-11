import React from 'react';
import {Skeleton} from "@/components/ui/skeleton"

const ProductSkeleton = () => {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[40vh] w-full rounded-xl"/>
        </div>
    );
};

export default ProductSkeleton;