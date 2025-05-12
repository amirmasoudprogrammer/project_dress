"use client";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import axios from "axios";
import InputFieldDiscounts from "@/components/admin/modules/InputFieldDiscounts";
import DatePickerField from "@/components/admin/modules/DatePickerField";
import Badge from "@/components/admin/modules/Badge";
import SelectFieldDiscounts from "@/components/admin/modules/SelectFieldDiscounts";
import { toast } from "sonner";
import Cookies from "js-cookie";

function EditPageDiscounts({ popupEdit, setPopupEdit }) {
    const [formData, setFormData] = useState({
        title: "",
        code: "",
        type: "percent",
        value: "",
        is_active: "true",
        description: "",
        min_order_amount: "",
        max_discount_amount: "",
        user_usage_limit: "",
        usage_limit: "",
        starts_at: null,
        expires_at: null,
        product_ids: [],
        category_ids: [],
    });


    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [expireDate, setExpireDate] = useState(null);

    useEffect(() => {
        if (popupEdit.item) {
            setFormData({
                title: popupEdit.item.title || "",
                code: popupEdit.item.code || "",
                type: popupEdit.item.type === "fixed" ? "fixed" : "percent",
                value: popupEdit.item.value || "",
                is_active: popupEdit.item.is_active ? "true" : "false",
                description: popupEdit.item.description || "",
                min_order_amount: popupEdit.item.min_order_amount || "",
                max_discount_amount: popupEdit.item.max_discount_amount || "",
                user_usage_limit: popupEdit.item.user_usage_limit || "",
                usage_limit: popupEdit.item.usage_limit || "",
                starts_at: new DateObject({ date: popupEdit.item.starts_at }),
                expires_at: new DateObject({ date: popupEdit.item.expires_at }),
                product_ids: popupEdit.item.product_ids || [],
                category_ids: popupEdit.item.category_ids || [],
            });
        }
    }, [popupEdit]);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);


    const fetchProducts = async () => {
        try {
            const token = Cookies.get('tokenAdmin');
            const res = await axios.get("https://joppin.ir/api/v1/products",{
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
            setCategories(res.data?.data?.filter(item => item.is_active) || []);
        } catch (error) {
            console.error("خطا در دریافت دسته‌بندی‌ها:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const addProduct = (id) => {
        if (!id || formData.product_ids.includes(id)) return;
        setFormData(prev => ({ ...prev, product_ids: [...prev.product_ids, id] }));
    };

    const removeProduct = (id) => {
        setFormData(prev => ({
            ...prev,
            product_ids: prev.product_ids.filter(pid => pid !== id),
        }));
    };

    const addCategory = (id) => {
        if (!id || formData.category_ids.includes(id)) return;
        setFormData(prev => ({ ...prev, category_ids: [...prev.category_ids, id] }));
    };

    const removeCategory = (id) => {
        setFormData(prev => ({
            ...prev,
            category_ids: prev.category_ids.filter(cid => cid !== id),
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedStartsAt = formData.starts_at?.convert("gregorian")?.toDate()?.toISOString();
        const formattedExpiresAt = formData.expires_at?.convert("gregorian")?.toDate()?.toISOString();
        const form = new FormData();
        form.append("code", formData.code);
        form.append("title", formData.title);
        form.append("description", formData.description);
        const correctType = formData.type === "fixed" || formData.type === "percent" ? formData.type : "percent";
        form.append("type", correctType);
        form.append("value", formData.value);
        form.append("min_order_amount", formData.min_order_amount);
        form.append("max_discount_amount", formData.max_discount_amount);
        form.append("usage_limit", formData.usage_limit);
        form.append("user_usage_limit", formData.user_usage_limit);
        form.append("starts_at", formattedStartsAt);
        form.append("expires_at", formattedExpiresAt);
        form.append("is_active", formData.is_active === "true" ? 1 : 0);
        form.append("_method", "PUT");

        formData.product_ids.forEach((id) => {
            form.append("product_ids[]", id);
        });
        formData.category_ids.forEach((id) => {
            form.append("category_ids[]", id);
        });

        try {
            const res = await axios.post(`https://joppin.ir/api/v1/admin/discounts/${popupEdit.item.id}`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(res)
            if (res.status === 200) {
                toast.success(res.data.message);
                setPopupEdit({show:false , item:null})
                setFormData({
                    title: "",
                    code: "",
                    type: "percent",
                    value: "",
                    is_active: "true",
                    description: "",
                    min_order_amount: "",
                    max_discount_amount: "",
                    user_usage_limit: "",
                    usage_limit: "",
                    starts_at: null,
                    expires_at: null,
                    product_ids: [],
                    category_ids: [],
                })
            }
        } catch (error) {
            console.error("خطا در ثبت تخفیف:", error.response?.data || error.message);
            toast.error("خطایی رخ داده است، لطفاً بررسی کنید.");
        }
    };


    if (!popupEdit.show) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 top-10 bottom-0">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative animate-fade-in overflow-y-auto h-[90vh]">
                <button
                    onClick={() => setPopupEdit({ show: false, item: null })}
                    className="absolute top-3 left-3 text-gray-500 hover:text-red-500 transition"
                >
                    <IoClose size={24} />
                </button>

                <h2 className="text-xl font-bold text-center mb-6 text-gray-700">ویرایش تخفیف</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <InputFieldDiscounts label="عنوان تخفیف" name="title" value={formData.title} onChange={handleChange} />
                        <InputFieldDiscounts label="کد تخفیف" name="code" value={formData.code} onChange={handleChange} />
                    </div>

                    <InputFieldDiscounts label="توضیحات" name="description" value={formData.description} onChange={handleChange} textarea />

                    <div className="grid grid-cols-2 gap-4">
                        <SelectFieldDiscounts label="نوع تخفیف" name="type" value={formData.type} onChange={handleChange} options={[
                            { value: "percent", label: "درصدی" },
                            { value: "fixed", label: "مبلغ ثابت" }
                        ]} />
                        <SelectFieldDiscounts label="وضعیت" name="is_active" value={formData.is_active} onChange={handleChange} options={[
                            { value: "true", label: "فعال" },
                            { value: "false", label: "غیرفعال" }
                        ]} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <InputFieldDiscounts label="مقدار تخفیف" name="value" value={formData.value} onChange={handleChange} type="number" />
                        <InputFieldDiscounts label="حداقل مبلغ سفارش" name="min_order_amount" value={formData.min_order_amount} onChange={handleChange} type="number" />
                        <InputFieldDiscounts label="سقف مبلغ تخفیف" name="max_discount_amount" value={formData.max_discount_amount} onChange={handleChange} type="number" />
                        <InputFieldDiscounts label="سقف استفاده کلی" name="usage_limit" value={formData.usage_limit} onChange={handleChange} type="number" />
                        <InputFieldDiscounts label="سقف استفاده هر کاربر" name="user_usage_limit" value={formData.user_usage_limit} onChange={handleChange} type="number" />
                    </div>

                    <div className="flex gap-4">
                        <DatePickerField label="تاریخ شروع" value={formData.starts_at} onChange={(date) => {
                            setStartDate(date);
                            setFormData((prev) => ({
                                ...prev,
                                starts_at: date,
                            }));
                        }}  />
                        <DatePickerField label="تاریخ پایان" value={formData.expires_at} onChange={(date) => {
                            setExpireDate(date);
                            setFormData((prev) => ({
                                ...prev,
                                expires_at: date,
                            }));
                        }}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">محصولات</label>
                            <select onChange={(e) => addProduct(Number(e.target.value))} className="p-2 rounded-md w-full border border-gray-300 focus:border-orange-400">
                                <option value="">یک محصول انتخاب کنید...</option>
                                {products.filter(p => !formData.product_ids.includes(p.id)).map(product => (
                                    <option key={product.id} value={product.id}>{product.name}</option>
                                ))}
                            </select>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {products.filter(p => formData.product_ids.includes(p.id)).map((item) => (
                                    <Badge key={item.id} label={item.name} onRemove={() => removeProduct(item.id)} />
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">دسته‌بندی‌ها</label>
                            <select onChange={(e) => addCategory(Number(e.target.value))} className="p-2 rounded-md w-full border border-gray-300 focus:border-orange-400">
                                <option value="">یک دسته‌بندی انتخاب کنید...</option>
                                {categories.filter(c => !formData.category_ids.includes(c.id)).map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {categories.filter(c => formData.category_ids.includes(c.id)).map((item) => (
                                    <Badge key={item.id} label={item.name} onRemove={() => removeCategory(item.id)} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg">
                        ذخیره تغییرات
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditPageDiscounts;
