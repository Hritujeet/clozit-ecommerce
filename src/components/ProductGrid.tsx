"use client"
import {useQuery} from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import {Product} from "@/utils/types";

const ProductGrid = ({title, fetchURL}: { title: string, fetchURL: string }) => {
    const {data, error, isFetching} = useQuery({
        queryFn: async () => {
            const response = await fetch(fetchURL);
            if (!response.ok) throw new Error("Failed to fetch products");
            return response.json();
        },
        queryKey: ["all-products"],
    });

    return (
        <section className="bg-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">{title}</h2>
                </div>

                {error && <p className="text-red-500">Error loading products.</p>}

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {isFetching && !data?.products
                        ? Array.from({length: 5}).map((_, index) => <ProductSkeleton key={index}/>)
                        : data.products.map((item: Product, index: number) => (
                            <ProductCard
                                key={index}
                                name={item.productName}
                                img={item.image}
                                discount={45}
                                price={499}
                                slug={item.slug}
                                avlSizes={item.sizes}
                                colors={item.colors}
                            />
                        ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
