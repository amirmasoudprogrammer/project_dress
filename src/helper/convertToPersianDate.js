export function convertToPersianDate(dateStr) {
    if (!dateStr) return "تاریخ نامعتبر";

    const [day, month, year] = dateStr.split("/");

    if (!day || !month || !year) return "تاریخ نامعتبر";

    const date = new Date(`${year}-${month}-${day}`);
    if (isNaN(date)) return "تاریخ نامعتبر";

    return date.toLocaleDateString("fa-IR");
}