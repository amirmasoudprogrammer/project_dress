import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./features/api/apiSlice";
import cartReducer from "./features/cart/cartSlice";
import productReducer from "./features/Products/productSlice";
import stepReducer from  "./features/step/stepSlice"

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
