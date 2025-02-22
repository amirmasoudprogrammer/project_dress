import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ساخت API Slice برای فچ کردن محصولات
export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.escuelajs.co/api/v1/" }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "products", // آدرس فچ داده‌ها
        }),
    }),
});

export const { useGetProductsQuery } = productApi;
