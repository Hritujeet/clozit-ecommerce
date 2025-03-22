import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProductsWrapper from "@/components/FeaturedProductsWrapper";
import { connectDb } from "@/utils/db";

export default async function Home() {
    await connectDb();
    return (
        <main>
            <Hero></Hero>
            <FeaturedProductsWrapper />
            <CategoryGrid />
            <Features></Features>
        </main>
    );
}
