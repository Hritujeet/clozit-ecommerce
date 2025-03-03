"use client"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import React from 'react';
import {buttonVariants} from "@/components/ui/button";
import {User} from "lucide-react";


const Navbar = () => {
    return (
        <nav className={"flex justify-evenly items-center p-4 flex-col md:flex-row gap-4"}>
            <div className="logo flex justify-evenly items-center w-full md:w-auto md:gap-0">
                <h1 className="text-4xl font-bold">Clozit</h1>
                <div className={"block md:hidden"}>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <span className={buttonVariants({variant: "outline", size: "icon"})}><User></User></span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Clozit</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <Link href={"/cart"}>
                                <DropdownMenuItem>
                                    Cart
                                </DropdownMenuItem>
                            </Link>
                            <Link href={"/profile"}>
                                <DropdownMenuItem>
                                    Profile
                                </DropdownMenuItem>
                            </Link>
                            <Link href={"/auth/sign-in"}>
                                <DropdownMenuItem>
                                    Sign In
                                </DropdownMenuItem>
                            </Link>
                            <Link href={"/auth/sign-up"}>
                                <DropdownMenuItem>
                                    Sign Up
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem>
                                SignOut
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="navigation">
                <NavigationMenu>
                    <NavigationMenuList className={"flex justify-between w-full md:w-auto"}>
                        <NavigationMenuItem>
                            <Link href="/" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={`${navigationMenuTriggerStyle()} font-semibold md:text-base`}>
                                    Home
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger
                                className={"font-semibold text-base"}>Products</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <Link href="/products/t-shirts" className={"w-[100%]"} legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={`${navigationMenuTriggerStyle()} font-semibold md:text-base`}>
                                        T-Shirts
                                    </NavigationMenuLink>
                                </Link>
                                <Link href="/products/hoodies" className={"w-[100%]"} legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={`${navigationMenuTriggerStyle()} font-semibold md:text-base`}>
                                        Hoodies
                                    </NavigationMenuLink>
                                </Link>
                                <Link href="/products/bottoms" className={"w-[100%]"} legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={`${navigationMenuTriggerStyle()} font-semibold md:text-base`}>
                                        Bottoms
                                    </NavigationMenuLink>
                                </Link>
                                <Link href="/products/winter-wear" className={"w-[100%]"} legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={`${navigationMenuTriggerStyle()} font-semibold md:text-base`}>
                                        Winter Wear
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/about" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={`${navigationMenuTriggerStyle()} font-semibold md:text-base`}>
                                    About
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/contact" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={`${navigationMenuTriggerStyle()} font-semibold md:text-base`}>
                                    Contact
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="auth-buttons flex justify-center items-center gap-2 md:block">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <span className={buttonVariants({variant: "outline", size: "icon"})}><User></User></span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Clozit</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <Link href={"/cart"}>
                            <DropdownMenuItem>
                                Cart
                            </DropdownMenuItem>
                        </Link>
                        <Link href={"/profile"}>
                            <DropdownMenuItem>
                                Profile
                            </DropdownMenuItem>
                        </Link>
                        <Link href={"/auth/sign-in"}>
                            <DropdownMenuItem>
                                Sign In
                            </DropdownMenuItem>
                        </Link>
                        <Link href={"/auth/sign-up"}>
                            <DropdownMenuItem>
                                Sign Up
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem>
                            SignOut
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </nav>
    );
};

export default Navbar;