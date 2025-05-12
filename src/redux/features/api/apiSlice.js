import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://joppin.ir/api/v1" }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "products", // نهایی: https://joppin.ir/api/v1/products
        }),
    }),
});

export const { useGetProductsQuery } = productApi;
