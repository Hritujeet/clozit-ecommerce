"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

const QueryProvider = ({
    children,
}: {
    children: Readonly<React.ReactNode>;
}) => {
    const client = new QueryClient();
    return (
        <Provider store={store}>
            <SessionProvider>
                <QueryClientProvider client={client}>
                    {children}
                </QueryClientProvider>
            </SessionProvider>
        </Provider>
    );
};

export default QueryProvider;
