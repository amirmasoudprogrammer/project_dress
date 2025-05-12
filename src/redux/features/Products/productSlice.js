import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// دریافت محصولات از API
export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, thunkAPI) => {
    try {
        const response = await fetch("https://joppin.ir/api/v1/products");
        if (!response.ok) throw new Error("خطا در دریافت محصولات");
        const data = await response.json();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
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
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    }
});

export default productSlice.reducer;
