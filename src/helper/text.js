const Text = (text) => {
    return text.split(" ").slice(0, 10).join("")
}
const ConvertCurrency = (amountInDollars, exchangeRate = 50000) => {
    if (isNaN(amountInDollars) || amountInDollars < 0) return "مقدار نامعتبر";

    const amountInTomans = Math.round(amountInDollars * exchangeRate);
    return amountInTomans.toLocaleString("fa-IR");
};



// **توابع محاسبه جمع قیمت و تعداد آیتم‌ها**
const calculateItemCounter = (products) => {
    return products.reduce((acc, cur) => acc + cur.quantity, 0);
};
const calculateTotal = (products, discount = 0) => {
    const total = products.reduce((acc, cur) => acc + (Number(cur.price) || 0) * (cur.quantity || 1), 0);
    return (total * (1 - discount / 100)).toFixed(2);
};


// ذخیره داده‌ها در localStorage
const saveCartToLocalStorage = (state) => {
    localStorage.setItem("cart", JSON.stringify(state));
};

const quantityitms = (state, id) => {
    if (!state || !Array.isArray(state.selectedItems)) {
        console.log(state);
        return 0; // مقدار پیش‌فرض
    }
    const items = state.selectedItems.findIndex(item => item.id === id)
    if (items === -1 ){
        return 0
    }else {
        return state.selectedItems[items].quantity
    }
}

export {Text ,ConvertCurrency , calculateItemCounter , calculateTotal , saveCartToLocalStorage , quantityitms}