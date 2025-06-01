import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

import Cookies from "js-cookie";
import axios from "axios";
import {toast, Toaster} from "sonner";

function ShippingInfo(props) {

    const state = useSelector((state) => state.cart);
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        phone: '',
        province: '',
        city: '',
        postal: '',
        address: '',
        landline: '',
        shipping_method: 'normal',
        payment_method: 'online'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };
    const provinces = ["خراسان رضوی", "تهران", "خراسان جنوبی", "خراسان شمالی"];
    const [color, setColor] = useState([])


    const fetchUserProfile = async () => {
        try {
            const token = Cookies.get('token');
            const res = await axios.get("https://joppin.ir/api/v1/user/profile", {
                headers: token ? {Authorization: `Bearer ${token}`} : {}
            });
            const userData = res.data.data;
            setFormData(prev => ({
                ...prev,
                name: userData.name ?? "",
                lastname: userData.last_name ?? "",
                phone: userData.mobile ?? "",
                address: userData.addresses ?? ""
            }));
        } catch (error) {
            console.error("خطا در دریافت اطلاعات کاربر:", error);
        }
    };


    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchData = async () => {
        try {
            const token = Cookies.get('tokenAdmin');
            const res = await axios.get('https://joppin.ir/api/v1/admin/colors', {
                headers: token ? {Authorization: `Bearer ${token}`} : {}
            });
            setColor(res.data.data);
        } catch (error) {
            console.error("خطا در دریافت محصولات:", error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);


    const submitOrder = async () => {
        if (isSubmitting) return;

        const items = state.selectedItems.map(item => {

            const selectedColor = color.find(c => c.name === item.color);
            console.log(selectedColor)

            return {
                product_id: item.id,
                quantity: item.quantity,
                price: Number(item.price),
                options: {
                    size_id: item.size?.toString(),
                    color_id: Number(selectedColor.id)
                }
            };
        });
        console.log(items)

        const form = new FormData();
        form.append("name", formData.name);
        form.append("last_name", formData.lastname);
        form.append("mobile", formData.phone);
        form.append("phone", formData.landline);
        form.append("province", formData.province);
        form.append("city", formData.city);
        form.append("postal_code", formData.postal);
        form.append("address", formData.address);
        form.append("shipping_method", formData.shipping_method);
        form.append("payment_method", formData.payment_method);

        items.forEach((item, index) => {
            form.append(`items[${index}][product_id]`, String(item.product_id));
            form.append(`items[${index}][quantity]`, String(item.quantity));
            form.append(`items[${index}][price]`, String(item.price));
            form.append(`items[${index}][options][size_id]`, String(item.options.size_id));
            form.append(`items[${index}][options][color_id]`, String(item.options.color_id));
        });
        setIsSubmitting(true)
        try {
            toast.loading("در حال ثبت سفارش...");
            const token = Cookies.get('token');
            const res = await axios.post(`https://joppin.ir/api/v1/orders`, form, {
            headers: {
            ...(token && {Authorization:` Bearer ${token}`})
            }
        });

        toast.dismiss();

        if (res.data.status === "error") {
            toast.error(res.data.message);
        } else {
            if (formData.payment_method === 'online') {
                const redirectUrl = res.data.data?.redirect_url
                res.data.redirect_url
                res.data.payment_url;

                if (redirectUrl) {
                    toast.success("در حال انتقال به درگاه پرداخت...");
                    setTimeout(() => {
                        window.location.href = redirectUrl;
                    }, 1000);
                } else {
                    toast.error("خطا در دریافت آدرس درگاه پرداخت");
                }
            } else {
                toast.success("سفارش با موفقیت ثبت شد!");
            }
        }
    } catch (error) {
        toast.dismiss();
        if (error.response?.status === 400) {
            toast.error(error.response.data.message || "درخواست نامعتبر بود");
        } else {
            console.error(error);
            toast.error("خطایی در ثبت سفارش رخ داد");
        }
    } finally {
        setIsSubmitting(false);
    }
};



    return (
        <>
            <Toaster expand={true} position="top-center" richColors/>
            <div
                className="container md:mr-20 mb-20 md:w-full h-auto flex flex-col md:flex-row items-start justify-between mt-20">
                <div className="w-full md:w-[816px] m-auto pt-12 pb-12 border border-slate-300 rounded">
                    <form className="flex flex-col gap-6 px-6">
                        {/* نام و نام خانوادگی */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex flex-col w-full">
                                <label htmlFor="name" className="text-black">نام*</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="نام خود را کامل کنید"
                                    className="text-black pr-2 h-[50px] border-slate-300 rounded border outline-0"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="lastname" className="text-black">نام خانوادگی*</label>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    placeholder="نام خانوادگی کامل کنید"
                                    className="text-black pr-2 h-[50px] border-slate-300 rounded border outline-0"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* شماره موبایل */}
                        <div className="flex flex-col">
                            <label htmlFor="phone" className="text-black">شماره موبایل*</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="شماره همراه خود را کامل کنید"
                                className="text-black pr-2 h-[50px] border-slate-300 rounded border outline-0"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        {/* استان، شهر، کد پستی */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex text-black flex-col w-full">
                                <label htmlFor="province">استان*</label>
                                <select
                                    id="province"
                                    name="province"
                                    className="w-full h-[50px] mt-1 border-slate-300 border rounded outline-0"
                                    value={formData.province}
                                    onChange={handleChange}
                                >
                                    <option value="">انتخاب استان</option>
                                    {provinces.map((prov) => (
                                        <option key={prov} value={prov}>{prov}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex text-black flex-col w-full">
                                <label htmlFor="city">شهر*</label>
                                <select
                                    id="city"
                                    name="city"
                                    className="w-full h-[50px] mt-1 border-slate-300 border rounded outline-0"
                                    value={formData.city}
                                    onChange={handleChange}
                                >
                                    <option value="">انتخاب شهر</option>
                                    {provinces.map((city) => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex text-black flex-col w-full">
                                <label htmlFor="postal">کدپستی*</label>
                                <input
                                    type="text"
                                    id="postal"
                                    name="postal"
                                    placeholder="کد پستی"
                                    className="text-black pr-2 h-[50px] border-slate-300 rounded border outline-0"
                                    value={formData.postal}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* آدرس پستی */}
                        <div className="flex text-black flex-col">
                            <label htmlFor="address" className="text-black">آدرس پستی*</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="آدرس خود را وارد کنید"
                                className="text-black pr-2 h-[50px] border-slate-300 rounded border outline-0 w-full"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>

                        {/* تلفن ثابت */}
                        <div className="flex text-black flex-col">
                            <label htmlFor="landline" className="text-black">تلفن ثابت (اختیاری)</label>
                            <input
                                type="text"
                                id="landline"
                                name="landline"
                                placeholder="تلفن ثابت کامل کنید"
                                className="text-black pr-2 h-[50px] border-slate-300 rounded border outline-0"
                                value={formData.landline}
                                onChange={handleChange}
                            />
                        </div>
                        {/* روش ارسال */}
                        <div className="flex text-black flex-col">
                            <label htmlFor="shipping_method">روش ارسال*</label>
                            <select
                                id="shipping_method"
                                name="shipping_method"
                                value={formData.shipping_method}
                                onChange={handleChange}
                                className="text-black pr-2 h-[50px] border-slate-300 rounded border outline-0"
                            >
                                <option value="normal">عادی</option>
                                <option value="express">سریع</option>
                                {/*<option value="pickup">دریافت حضوری</option>*/}
                            </select>
                        </div>

                        {/* روش پرداخت */}
                        <div className="flex text-black flex-col">
                            <label htmlFor="payment_method">روش پرداخت*</label>
                            <select
                                id="payment_method"
                                name="payment_method"
                                value={formData.payment_method}
                                onChange={handleChange}
                                className="text-black pr-2 h-[50px] border-slate-300 rounded border outline-0"
                            >
                                <option value="online">پرداخت آنلاین</option>
                                {/*<option value="credit_card">کارت‌خوان در محل</option>*/}
                                {/*<option value="bank_transfer">واریز بانکی</option>*/}
                                {/*<option value="cash">پرداخت نقدی</option>*/}
                            </select>
                        </div>

                    </form>
                </div>

                <div
                    className="mt-16 md:mt-0 m-auto w-[312px] md:w-[384px] h-[320px] border border-gray-300">
                    <div
                        className="w-[264px] md:w-[336px] h-[56px] border rounded border-gray-300 m-auto mt-5 flex items-center justify-between">
                        <input type="text" placeholder="کد تخفیف"
                               className="mr-3 text-[#626262] w-[100px] outline-0 h-[30px]"/>
                        <div
                            className="w-[104px] md:w-[138px] h-[44px] ml-2 rounded cursor-pointer flex items-center bg-slate-200 justify-center">
                            <span className="text-slate-300">اعمال تخفیف</span>
                        </div>
                    </div>
                    <div
                        className="text-black flex w-[264px] md:w-[336px] m-auto justify-between mt-8 border-b-2 pb-5 border-slate-300">
                        <span className="text-[16px] text-[#626262]">قیمت کالا:</span>
                        <p className="text-[16px] text-[#626262]">{Number(state.total).toLocaleString("fa-IR")}تومان</p>
                    </div>
                    <div className="text-black flex w-[264px] md:w-[336px] m-auto justify-between mt-8 ">
                        <span className="text-[16px] text-[#626262]">قیمت کالا:</span>
                        <p className="text-[16px] text-red-600">{Number(state.total).toLocaleString("fa-IR")}تومان</p>
                    </div>
                    <div
                        className="w-[280px] md:w-[336px] h-[42px] bg-[#3083FF] m-auto flex items-center justify-center mt-10 mb-5 rounded">
                        <button disabled={isSubmitting} onClick={submitOrder}>
                            {isSubmitting ? " درحال پردازش..." : "نهایی سازی سفارش"}
                        </button>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ShippingInfo;