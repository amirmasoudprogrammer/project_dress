"use client";
import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function Providers({ children }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </Provider>
    );
}

export default Providers;
