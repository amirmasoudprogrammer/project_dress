"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, Toaster } from "sonner";
import { FaUserAlt, FaLock } from "react-icons/fa";

function LoginAdmin() {
    const [form, setForm] = useState({ username: "", password: "" });
    const router = useRouter();

    const handlersOnChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", form.username);
        formData.append("password", form.password);

        try {
            const res = await axios.post("https://joppin.ir/api/auth/admin-login", formData);
            if (res.status === 200) {
                toast.success(res.data.message);
                Cookies.set("tokenAdmin", res.data.token, { expires: 10 });
                axios.interceptors.request.use((config) => {
                    const token = Cookies.get("tokenAdmin");
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                    return config;
                });

                router.push("/Admin_Dashboard");
            }
        } catch (err) {
            toast.error("ورود ناموفق بود. لطفاً اطلاعات را بررسی کنید.");
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
            <Toaster expand={true} position="bottom-center" richColors />
            <form
                onSubmit={handleSubmit}
                className="backdrop-blur-lg bg-white/30 shadow-2xl border border-white/30 rounded-3xl p-8 w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">ورود به پنل مدیریت</h2>

                <div className="relative mb-5">
                    <FaUserAlt className="absolute top-3 right-3 text-gray-500" />
                    <input
                        type="text"
                        name="username"
                        placeholder="نام کاربری"
                        value={form.username}
                        onChange={handlersOnChange}
                        className="w-full py-2 pr-10 pl-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        required
                    />
                </div>

                <div className="relative mb-6">
                    <FaLock className="absolute top-3 right-3 text-gray-500" />
                    <input
                        type="password"
                        name="password"
                        placeholder="رمز عبور"
                        value={form.password}
                        onChange={handlersOnChange}
                        className="w-full py-2 pr-10 pl-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200"
                >
                    ورود
                </button>
            </form>
        </div>
    );
}

export default LoginAdmin;
