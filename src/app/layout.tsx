import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NextTopLoader from "nextjs-toploader";
import Footer from "@/components/Footer";
import QueryProvider from "@/utils/QueryProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: "Clozit | Elevate Your Style, Define Your Story",
    description:
        "Shop the latest fashion trends at Clozit – your go-to online clothing store for stylish, high-quality apparel. Discover trendy outfits, exclusive collections, and effortless shopping with fast delivery. Upgrade your wardrobe today!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <QueryProvider>
                    <NextTopLoader />
                    <Navbar />
                    <Toaster />
                    {children}
                    <Footer></Footer>
                </QueryProvider>
            </body>
        </html>
    );
}
