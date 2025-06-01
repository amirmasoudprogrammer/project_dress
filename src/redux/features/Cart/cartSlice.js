import {createSlice} from "@reduxjs/toolkit";
import {calculateItemCounter, calculateTotal, saveCartToLocalStorage} from "@/helper/text";

const loadCartFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        try {
            const data = localStorage.getItem("cart");
            if (data) {
                const parsed = JSON.parse(data);
                return {
                    selectedItems: Array.isArray(parsed.selectedItems) ? parsed.selectedItems : [],
                    itemsCounter: typeof parsed.itemsCounter === 'number' ? parsed.itemsCounter : 0,
                    total: Number(parsed.total) || 0,
                    discount: typeof parsed.discount === 'number' ? parsed.discount : 0,
                    checkout: parsed.checkout ?? false
                };
            }
        } catch (err) {
            console.warn("localStorage cart corrupted, resetting.", err);
        }
    }

    return {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
        discount: 0,
        checkout: false
    };
};


const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        AddITEM: (state, action) => {
            const product = action.payload?.data?.product
            const color = action.payload?.colors
            const size = action.payload?.size
            if (!product) {
                console.error("Product not found in action payload:", action.payload);
                return;
            }
            if (!Array.isArray(state.selectedItems)) {
                console.warn("selectedItems was invalid. Resetting to []");
                state.selectedItems = [];
            }

            const exists = state.selectedItems.find(item =>
                item.id === product.id &&
                item.colors === color &&
                item.size === size
            );

            if (!exists) {
                state.selectedItems.push({
                    ...action.payload,
                    quantity: 1,
                    name: product.name,
                    image: product.featured_image,
                    id: product.id,
                    price: product.price,
                    color,
                    size
                });
                state.total = calculateTotal(state.selectedItems);
                state.itemsCounter = calculateItemCounter(state.selectedItems);
                state.checkout = false;
                saveCartToLocalStorage(state);
                console.log({state, action})
            }
        },
        RemoveITEM: (state, action) => {
            console.log({state, action})
            const product = action.payload;
            const color = product.color;
            const size = product.size;

            if (!product || !product.id) {
                console.error("Product not found in action payload:", action.payload);
                return;
            }

            state.selectedItems = state.selectedItems.filter(item => {
                if (!item) return false;
                return !(item.id === product.id && item.color === color && item.size === size);
            });

            state.total = calculateTotal(state.selectedItems);
            state.itemsCounter = calculateItemCounter(state.selectedItems);
            state.checkout = false;
            saveCartToLocalStorage(state);
        },
        increase: (state, action) => {
            console.log({state, action})
            const product = action.payload;
            const color = product.color;
            const size = product.size;

            if (!product || !product.id) {
                console.error("Product not found in action payload:", action.payload);
                return;
            }
            const increaseindex = state.selectedItems.findIndex(item => item.id === product.id && item.color === color && item.size === size)
            if (increaseindex >= 0) {
                state.selectedItems[increaseindex].quantity++;
                state.total = calculateTotal(state.selectedItems);
                state.itemsCounter = calculateItemCounter(state.selectedItems);
                state.checkout = false;
                saveCartToLocalStorage(state);
            }

        },
        decrease: (state, action) => {
            console.log({state, action})
            const product = action.payload;
            const color = product.color;
            const size = product.size;

            if (!product || !product.id) {
                console.error("Product not found in action payload:", action.payload);
                return;
            }
            const decreaseIndex = state.selectedItems.findIndex(item => item.id === product.id && item.color === color && item.size === size)
            if (decreaseIndex >= 0 && state.selectedItems[decreaseIndex].quantity > 1) {
                state.selectedItems[decreaseIndex].quantity--;
                state.total = calculateTotal(state.selectedItems);
                state.itemsCounter = calculateItemCounter(state.selectedItems);
                state.checkout = false;
                saveCartToLocalStorage(state);
            }
        },
        checkout: (state) => {
            state.selectedItems = [],
                state.itemsCounter = 0,
                state.total = 0,
                state.discount = 0

        }

    }
});

export default cartSlice.reducer;
export const {
    AddITEM,
    RemoveITEM,
    increase,
    decrease,
    checkout,
    addToFavorites, addToSavedItems
} = cartSlice.actions;
