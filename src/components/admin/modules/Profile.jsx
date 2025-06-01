"use client";
import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function Profile() {
    const router = useRouter();

    const startRemove = () => {
        Cookies.remove("tokenAdmin");
        router.push("/");  // ریدایرکت به صفحه اصلی
    };

    return (
        <div className="absolute top-14 left-10 w-72 rounded-2xl shadow-xl bg-white p-4 z-50">
            <div className="flex items-center gap-3 border-b pb-4">
                <img
                    src="/image/photo_admin.jpg"
                    alt="profile"
                    className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                    <p className="text-gray-800 font-semibold">امیرمسعود اسدی طلب</p>
                    <p className="text-sm text-gray-500">کاربر ادمین</p>
                </div>
            </div>
            <div className="pt-4 space-y-3">
                <button className="w-full flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
                    <FaUser size={16} />
                    پروفایل من
                </button>
                <button onClick={startRemove} className="w-full flex items-center gap-2 text-sm text-red-600 hover:text-red-800">
                    <FiLogOut size={16} />
                    خروج از حساب
                </button>
            </div>
        </div>
    );
}

export default Profile;
