import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "@/redux/features/api/apiSlice";
import cartReducer from "@/redux/features/Cart/cartSlice";
import productReducer from "@/redux/features/Products/productSlice";
import stepReducer from  "@/redux/features/step/stepSlice"

const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        cart: cartReducer,
        products: productReducer,
        step: stepReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware),
});

export default store;
