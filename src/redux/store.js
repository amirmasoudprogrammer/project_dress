import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./apiSlice";

// ایجاد استور با RTK Query
const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware), // اضافه کردن middleware برای RTK Query
});

export default store;
