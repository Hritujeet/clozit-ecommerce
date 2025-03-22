import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProductsWrapper from "@/components/FeaturedProductsWrapper";

export default function Home() {
    console.log("Page Rendered on:", typeof window === "undefined" ? "Server" : "Client");

    return (
        <main>
            <Hero></Hero>
            <FeaturedProductsWrapper />
            <CategoryGrid />
            <Features></Features>
        </main>
    );
}
