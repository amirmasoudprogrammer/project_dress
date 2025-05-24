import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import axios from "axios";
import { toast, Toaster } from "sonner";
import InputField from "@/components/client/module/InputField";

function ProfileUser({ data, onProfileUpdated }) {
    const [formData, setFormData] = useState({
        user_name: "",
        firstName: "",
        lastName: "",
        mobile: "",
        birthDate: "",
        email: "",
        address: ""
    });

    useEffect(() => {
        if (data) {
            setFormData({
                user_name: data.user_name ?? "",
                firstName: data.name ?? "",
                lastName: data.last_name ?? "",
                mobile: data.mobile ?? "",
                birthDate: data.birthday ? new Date(data.birthday).toISOString().split('T')[0] : "",
                email: data.email ?? "",
                address: data.address ?? ""
            });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const startSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append("name", formData.firstName);
            form.append("last_name", formData.lastName);
            form.append("user_name", formData.user_name);
            form.append("email", formData.email);
            form.append("phone", formData.mobile);
            form.append("birthday", formData.birthDate);
            form.append("address", formData.address);
            form.append("_method", "PUT");

            const token = Cookies.get('token');
            const res = await axios.post("https://joppin.ir/api/v1/user/profile", form, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });

            if (res.data) {
                toast.success("حساب کاربری با موفقیت ویرایش شد!");
                // داده‌های جدید را از سرور دریافت کن
                onProfileUpdated(); // این تابع از Page آمده
            }
        } catch (error) {
            toast.error("خطا در ارسال اطلاعات");
            console.error(error);
        }
    };

    return (
        <div className="mt-5">
            <Toaster expand={true} position="top-center" richColors />
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">اطلاعات حساب کاربری</h2>
                <div className="w-24 h-[3px] bg-red-500 mt-2 rounded"></div>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={startSubmit}>
                <InputField label="نام" name="firstName" value={formData.firstName} onChange={handleChange} />
                <InputField label="نام خانوادگی" name="lastName" value={formData.lastName} onChange={handleChange} />
                <InputField label="نام کاربری" name="user_name" value={formData.user_name} onChange={handleChange} />
                <InputField label="شماره موبایل" name="mobile" value={formData.mobile} onChange={handleChange} />
                <InputField label="تاریخ تولد" name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} />
                <InputField label="ایمیل" name="email" type="email" value={formData.email} onChange={handleChange} />
                <InputField label="آدرس" name="address" value={formData.address} onChange={handleChange} />

                <div className="flex items-center justify-end mt-20 col-span-2">
                    <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out"
                    >
                        ارسال
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProfileUser;
