"use client"
import React, {useEffect, useState} from "react";
import axios from "axios";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {SlCalender} from "react-icons/sl";
import {useRouter} from "next/navigation";
import {toast, Toaster} from "sonner";
import Cookies from "js-cookie";

function AddDiscount() {
    const [formData, setFormData] = useState({
        code: "",
        title: "",
        description: "",
        type: "percent",
        value: "",
        min_order_amount: "",
        max_discount_amount: "",
        usage_limit: "",
        user_usage_limit: "",
        starts_at: "",
        expires_at: "",
        is_active: "true",
        product_ids: [],
        category_ids: [],
    });
    const router = useRouter();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [expireDate, setExpireDate] = useState(null);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);




    const fetchProducts = async () => {
        try {
            const token = Cookies.get('tokenAdmin');
            const res = await axios.get("https://joppin.ir/api/v1/products" , {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            setProducts(res.data?.data || []);
        } catch (error) {
            console.error("خطا در دریافت محصولات:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const token = Cookies.get('tokenAdmin');
            const res = await axios.get("https://joppin.ir/api/v1/admin/categories",{
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            const activeItems = res.data?.data?.filter((item) => item.is_active) || [];
            setCategories(activeItems);
        } catch (error) {
            console.error("خطا در دریافت دسته‌بندی‌ها:", error);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addProduct = (id) => {
        if (!id) return;
        setFormData((prev) => ({
            ...prev,
            product_ids: [...prev.product_ids, id],
        }));
    };

    const removeProduct = (id) => {
        setFormData((prev) => ({
            ...prev,
            product_ids: prev.product_ids.filter((pid) => pid !== id),
        }));
    };

    const addCategory = (id) => {
        if (!id) return;
        setFormData((prev) => ({
            ...prev,
            category_ids: [...prev.category_ids, id],
        }));
    };

    const removeCategory = (id) => {
        setFormData((prev) => ({
            ...prev,
            category_ids: prev.category_ids.filter((cid) => cid !== id),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("code", formData.code);
        form.append("title", formData.title);
        form.append("description", formData.description);
        const correctType = formData.type === "fixed" || formData.type === "percent" ;
        form.append("type", correctType);
        form.append("value", formData.value);
        form.append("min_order_amount", formData.min_order_amount);
        form.append("max_discount_amount", formData.max_discount_amount);
        form.append("usage_limit", formData.usage_limit);
        form.append("user_usage_limit", formData.user_usage_limit);
        form.append("starts_at", formData.starts_at);
        form.append("expires_at", formData.expires_at);
        form.append("is_active", formData.is_active === "true" ? 1 : 0);
        formData.product_ids.forEach((id) => {
            form.append("product_ids[]", id);
        });

        formData.category_ids.forEach((id) => {
            form.append("category_ids[]", id);
        });
        try {
            const res = await axios.post("https://joppin.ir/api/v1/admin/discounts", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(res);
            if (res.status === 201) {
                toast.success(res.data.message);
                setTimeout(() => {
                    router.push("/Admin_Dashboard/Discounts");
                }, 2000);
            }

        } catch (error) {
            console.error("خطا در ثبت تخفیف:", error.response?.data || error.message);
            alert("خطایی رخ داده است، لطفا بررسی کنید.");
        }
    };


    return (
        <div className="max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow-lg space-y-8">
            <Toaster expand={true} position="bottom-center" richColors/>
            <h2 className="text-3xl font-bold mb-6 text-center">افزودن کد تخفیف</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ورودی‌های متنی */}
                {[
                    {label: "کد تخفیف", name: "code", required: true},
                    {label: "عنوان تخفیف", name: "title", required: true},
                ].map(({label, name, required}) => (
                    <div key={name}>
                        <label className="block text-sm font-semibold mb-2">
                            {label} {required && "*"}
                        </label>
                        <input
                            type="text"
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            required={required}
                            className="w-full p-3 border rounded-lg"
                        />
                    </div>
                ))}


                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">توضیحات</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="1"
                        className="w-full p-3 border rounded-lg"
                    ></textarea>
                </div>


                <div>
                    <label className="block text-sm font-semibold mb-2">نوع تخفیف *</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                        required
                    >
                        <option value="percent">درصدی</option>
                        <option value="fixed">مبلغ ثابت</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">مقدار تخفیف *</label>
                    <input
                        type="number"
                        name="value"
                        value={formData.value}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-lg"
                    />
                </div>


                {[
                    {label: "حداقل مبلغ سفارش", name: "min_order_amount"},
                    {label: "سقف مبلغ تخفیف", name: "max_discount_amount"},
                    {label: "حداکثر دفعات استفاده", name: "usage_limit"},
                    {label: "تعداد استفاده هر کاربر", name: "user_usage_limit"},
                ].map(({label, name}) => (
                    <div key={name}>
                        <label className="block text-sm font-semibold mb-2">{label}</label>
                        <input
                            type="number"
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                        />
                    </div>
                ))}

                <div className="md:col-span-2 flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col w-full">
                        <label className="block text-sm font-semibold mb-2">تاریخ شروع</label>
                        <div className="flex items-center border p-2 rounded-lg">
                            <DatePicker
                                value={startDate}
                                onChange={(date) => {
                                    setStartDate(date);
                                    setFormData((prev) => ({
                                        ...prev,
                                        starts_at: date?.toDate()?.toISOString(), // تبدیل به فرمت ISO میلادی
                                    }));
                                }}
                                format="YYYY-MM-DD HH:mm"
                                calendar={persian}
                                locale={persian_fa}
                                plugins={[<TimePicker position="bottom" />]}
                            />


                            <SlCalender className="text-xl ml-2"/>
                        </div>
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="block text-sm font-semibold mb-2">تاریخ پایان</label>
                        <div className="flex items-center border p-2 rounded-lg">
                            <DatePicker
                                value={expireDate}
                                onChange={(date) => {
                                    setExpireDate(date);
                                    setFormData((prev) => ({
                                        ...prev,
                                        expires_at: date?.toDate()?.toISOString(), // تبدیل به ISO
                                    }));
                                }}
                                format="YYYY-MM-DD HH:mm"
                                calendar={persian}
                                locale={persian_fa}
                                plugins={[<TimePicker position="bottom" />]}
                            />


                            <SlCalender className="text-xl ml-2"/>
                        </div>
                    </div>
                </div>


                <div>
                    <label className="block text-sm font-semibold mb-2">وضعیت</label>
                    <select
                        name="is_active"
                        value={formData.is_active}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                    >
                        <option value="true">فعال</option>
                        <option value="false">غیرفعال</option>
                    </select>
                </div>


                <div className="flex flex-col mb-6">
                    <label className="mb-2 font-semibold text-sm">محصولات</label>


                    <select
                        onChange={(e) => addProduct(Number(e.target.value))}
                        className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
                        value=""
                    >
                        <option value="">یک محصول انتخاب کنید...</option>
                        {products
                            .filter((p) => !formData.product_ids.includes(p.id))
                            .map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                    </select>

                    <div className="flex items-center space-x-2 mb-2 flex-wrap mt-2">
                        {formData.product_ids.map((id) => {
                            const product = products.find((p) => p.id === id);
                            return (
                                <div
                                    key={id}
                                    className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                                >
                                    {product?.name}
                                    <button
                                        type="button"
                                        onClick={() => removeProduct(id)}
                                        className="ml-2 text-red-500 font-bold"
                                    >
                                        ×
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>


                <div className="flex flex-col mb-6 flex-col">
                    <label className="mb-2 font-semibold text-sm">دسته‌بندی‌ها</label>
                    <select
                        onChange={(e) => addCategory(Number(e.target.value))}
                        className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
                        value=""
                    >
                        <option value="">یک دسته‌بندی انتخاب کنید...</option>
                        {categories
                            .filter((c) => !formData.category_ids.includes(c.id))
                            .map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                    </select>


                    <div className="flex items-center space-x-2 mb-2 flex-wrap mt-3">
                        {formData.category_ids.map((id) => {
                            const category = categories.find((c) => c.id === id);
                            return (
                                <div
                                    key={id}
                                    className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                                >
                                    {category?.name}
                                    <button
                                        type="button"
                                        onClick={() => removeCategory(id)}
                                        className="ml-2 text-red-500 font-bold"
                                    >
                                        ×
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>


                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-all duration-300"
                    >
                        ذخیره کد تخفیف
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddDiscount;
