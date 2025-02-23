const Text = (text) => {
    return text.split(" ").slice(0, 3).join("")
}
const ConvertCurrency = (amountInDollars, exchangeRate = 50000) => {
    if (isNaN(amountInDollars) || amountInDollars < 0) return "مقدار نامعتبر";

    const amountInTomans = Math.round(amountInDollars * exchangeRate);
    return amountInTomans.toLocaleString("fa-IR");
};


export {Text ,ConvertCurrency}