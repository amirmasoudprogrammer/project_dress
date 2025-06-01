import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://joppin.ir/api/v1" }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            // دریافت لیست محصولات صفحه‌بندی شده
            query: (page = 1) => `products?page=${page}`,
        }),

        getNewArrivals: builder.query({
            // دریافت محصولات جدید
            query: () => 'products/new-arrivals',
        }),
    }),
});

export const { useGetProductsQuery, useGetNewArrivalsQuery } = productApi;
