import ProductCard from "./ProductCard";

const ProductGrid = ({title}: { title: string }) => {
    return (
        <section className="bg-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">{title}</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <ProductCard name={"Oversized T-Shirt - Custom Design"}
                                 img={"https://www.yourprint.in/wp-content/uploads/2022/02/oversized_top.jpg"}
                                 discount={45} price={499}/>

                    <ProductCard name={"Oversized T-Shirt - Custom Design"}
                                 img={"https://www.yourprint.in/wp-content/uploads/2022/02/oversized_top.jpg"}
                                 discount={45} price={499}/>

                    <ProductCard name={"Oversized T-Shirt - Custom Design"}
                                 img={"https://www.yourprint.in/wp-content/uploads/2022/02/oversized_top.jpg"}
                                 discount={45} price={499}/>

                    <ProductCard name={"Oversized T-Shirt - Custom Design"}
                                 img={"https://www.yourprint.in/wp-content/uploads/2022/02/oversized_top.jpg"}
                                 discount={45} price={499}/>
                    <ProductCard name={"Oversized T-Shirt - Custom Design"}
                                 img={"https://www.yourprint.in/wp-content/uploads/2022/02/oversized_top.jpg"}
                                 discount={45} price={499}/>
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
