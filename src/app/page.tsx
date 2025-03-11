import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Features from "@/components/Features";
import CategoryGrid from "@/components/CategoryGrid";

export default function Home() {
    return (
        <main>
            <Hero></Hero>
            <FeaturedProducts></FeaturedProducts>
            <CategoryGrid />
            <Features></Features>
        </main>
    );
}
