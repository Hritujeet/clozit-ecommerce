import React from 'react';
import heroImg from "@/assets/hero.jpg"
import Link from "next/link";

const Hero = () => {
    return (
        <div className="overflow-x-hidden">
            <section className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0 md:min-h-[70vh] min-h-[50vh] flex flex-col justify-center items-center" style={{
                backgroundImage: `url(${heroImg.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}>
                <div className="bg-black w-full h-full absolute top-0 left-0 opacity-40"></div>
                <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">Elevate Your Style, Define Your Story</h1>

                        <div className="relative inline-flex mt-10 group">
                            <div
                                className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-lg blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>

                            <Link href="/products" title=""
                               className="relative inline-flex items-center justify-center px-6 py-3 font-semibold text-neutral-900 transition-all duration-200 bg-white font-pj rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                               role="button">
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </div>

            </section>
        </div>

    )
}
export default Hero;