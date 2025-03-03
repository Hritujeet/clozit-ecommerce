import React from 'react';
import SignUpComponent from "@/components/SignUpComponent";
import { Metadata } from 'next';

const Page = () => {
    return (
        <div>
            <SignUpComponent></SignUpComponent>
        </div>
    );
};

export default Page;

export const metadata: Metadata = {
    title: "Sign Up | Clozit",
    description: "",
  };
  