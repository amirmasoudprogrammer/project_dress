import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// دریافت محصولات از API
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    const data = await response.json();
    return data;
});

// مقداردهی اولیه
const initialState = {
    products: [],
    loading: false,
    error: null
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => { state.loading = true; })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default productSlice.reducer;
export { fetchProducts };
