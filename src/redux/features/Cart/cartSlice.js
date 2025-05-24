import {createSlice} from "@reduxjs/toolkit";
import {calculateItemCounter, calculateTotal, saveCartToLocalStorage} from "@/helper/text";

const loadCartFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        // مطمئن شوید که کد فقط در سمت کلاینت اجرا می‌شود
        const data = localStorage.getItem("cart");
        return data ? JSON.parse(data) : {
            selectedItems: [],
            itemsCounter: 0,
            total: 0,
            favorites: [],
            savedItem: [],
            discount: 0
        };
    }
    return {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
        favorites: [],
        savedItem: [],
        discount: 0
    };
};


const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        AddITEM: (state, action) => {
            console.log({state,action})
            if (!state.selectedItems.find(item => item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size)) {
                state.selectedItems.push({
                    ...action.payload,
                    quantity: 1,
                    color: action.payload.color,
                    size: action.payload.size,
                })
                state.total = calculateTotal(state.selectedItems)
                state.itemsCounter = calculateItemCounter(state.selectedItems)
                state.checkout = false
                saveCartToLocalStorage(state.selectedItems)
            }
        },
        RemoveITEM: (state, action) => {
            if (!action.payload?.id) return;

            state.selectedItems = state.selectedItems.filter(item => item.id !== action.payload.id);

            // محاسبه مجدد مقدارها بعد از حذف
            state.total = calculateTotal(state.selectedItems);
            state.itemsCounter = calculateItemCounter(state.selectedItems);

            // ذخیره در لوکال استوریج
            saveCartToLocalStorage(state.selectedItems);
        },
        increase: (state, action) => {
            console.log({state,action})
            const increaseindex =state.selectedItems.findIndex(item => item.id === action.payload.id  && item.colors === action.payload.color && item.size === action.payload.size)

            if (increaseindex >= 0) {
                state.selectedItems[increaseindex].quantity++;
                state.total = calculateTotal(state.selectedItems);
                state.itemsCounter = calculateItemCounter(state.selectedItems);
                saveCartToLocalStorage(state)
            }

        },
        decrease: (state, action) => {
            if (!action.payload?.id || !action.payload?.color || !action.payload?.size) return;
            const decreaseIndex = state.selectedItems.findIndex(item =>
                item.id === action.payload.id &&
                item.colors === action.payload.color &&
                item.size === action.payload.size
            );
            if (decreaseIndex >= 0 && state.selectedItems[decreaseIndex].quantity > 1) {
                state.selectedItems[decreaseIndex].quantity--;
                state.total = calculateTotal(state.selectedItems);
                state.itemsCounter = calculateItemCounter(state.selectedItems);
            }
            saveCartToLocalStorage(state.selectedItems);
        },
        addToFavorites: (state, action) => {
            if (!action.payload?.id) return;

            // اطمینان از اینکه favorites همیشه یک آرایه است
            if (!Array.isArray(state.favorites)) {
                state.favorites = []; // اگر آرایه نباشد، یک آرایه خالی بسازید
            }

            const favoriteIndex = state.favorites.findIndex(item => item.id === action.payload.id);

            if (favoriteIndex >= 0) {
                // حذف از لیست علاقه‌مندی‌ها
                state.favorites = state.favorites.filter(item => item.id !== action.payload.id);
            } else {
                // اضافه کردن به لیست علاقه‌مندی‌ها
                state.favorites = [...state.favorites, action.payload];
            }

            saveCartToLocalStorage(state);
        },
        addToSavedItems: (state, action) => {
            if (!action.payload?.id) return; // بررسی مقدار معتبر برای جلوگیری از خطا

            const savedIndex = state.savedItem.findIndex(
                item => item.id === action.payload.id
            );

            if (savedIndex >= 0) {
                // اگر آیتم در لیست ذخیره‌شده‌ها بود، حذف کن
                state.savedItem.splice(savedIndex, 1);
            } else {
                // اگر آیتم نبود، اضافه کن
                state.savedItem.push(action.payload);
            }

            // ذخیره کل state در localStorage
            saveCartToLocalStorage(state);
        },
        checkout: (state) => {
            state.selectedItems = [];
            state.itemsCounter = 0;
            state.total = 0;
            state.discount = 0;
            localStorage.removeItem("cart");
            saveCartToLocalStorage(state);
        },

    }
});

export default cartSlice.reducer;
export const {
    AddITEM,
    RemoveITEM,
    increase,
    decrease,
    checkout,
    addToFavorites,
    addToSavedItems,
} = cartSlice.actions;
