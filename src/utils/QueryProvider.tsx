"use client";
import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SessionProvider} from "next-auth/react";

const QueryProvider = ({
                           children,
                       }: {
    children: Readonly<React.ReactNode>;
}) => {
    const client = new QueryClient();
    return (
        <SessionProvider>
            <QueryClientProvider client={client}>
                {children}
            </QueryClientProvider>
        </SessionProvider>
    );
};

export default QueryProvider;
