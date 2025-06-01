"use client";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {motion} from "framer-motion";
import {
    AiTwotoneEdit,
    AiOutlineMessage,
} from "react-icons/ai";
import {IoBagOutline, IoNotificationsOutline} from "react-icons/io5";
import {CiHeart, CiLogin} from "react-icons/ci";
import {FaAngleDown} from "react-icons/fa6";
import {RxHamburgerMenu} from "react-icons/rx";
import UserGuard from "@/app/User_Dashboard/UserGuard";
import Cookies from "js-cookie";
import axios from "axios";

function Layout({children}) {
    const [isOpen, setIsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const [user , setUser] =useState([])
    useEffect(() => {
        const fetchBlog= async () => {
            try {
                const token = Cookies.get('token');
                const res = await axios.get(`https://joppin.ir/api/v1/user/profile`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                });
                setUser(res.data.data)
            } catch (error) {
                console.error(`Error fetching banners for:`, error);
            }
        };

        fetchBlog()
        const interval = setInterval(() => {
            fetchBlog()
        }, 5000);
        return () => clearInterval(interval);
    }, []);



    const menuItems = [
        {
            href: "/User_Dashboard/orders",
            icon: <IoBagOutline/>,
            label: "سفارش ها",
            color: "text-blue-600",
        },
        {
            href: "/User_Dashboard/favorites",
            icon: <CiHeart/>,
            label: "علاقه مندی ها",
            color: "text-red-500",
        },
        {
            href: "",
            icon: <CiLogin/>,
            label: "خروج",
            color: "text-red-600",
        },
    ];

    const startDelete = ({href ,label}) =>{
        if (label === "خروج") {
            Cookies.remove('token'); // ✅ حذف توکن
            // در صورت نیاز: ریدایرکت به صفحه ورود
            window.location.href = href || "/Login_Registration";
        }
    }

    return (
        <UserGuard>
            <div className="container mx-auto px-4 md:px-10 flex flex-col md:flex-row gap-6 mt-10 relative">
                {/* موبایل: دکمه باز کردن منو */}
                <div className="md:hidden flex items-center justify-end">
                    <button onClick={() => setMenuOpen(true)} className="text-3xl text-gray-700">
                        <RxHamburgerMenu/>
                    </button>
                </div>

                {/* موبایل: منوی کشویی */}
                <motion.div
                    initial={{x: "100%"}}
                    animate={{x: menuOpen ? "0%" : "100%"}}
                    transition={{duration: 0.4}}
                    className="fixed top-0 -right-0 w-[80%] h-full bg-white shadow-lg z-50 p-6 md:hidden rounded-l-xl"
                >
                    <button onClick={() => setMenuOpen(false)} className="absolute left-4 top-4 text-2xl text-red-500">
                        ✖
                    </button>
                    <div className="mt-16 space-y-6">
                        {menuItems.slice(0, 2).map(({href, icon, label, color}) => (
                            <Link
                                onClick={() =>startDelete({href,label})}
                                key={label}
                                href={href}
                                className={`flex items-center gap-3 text-[15px] border-b border-gray-200 pb-2 text-gray-800 hover:text-black transition`}
                            >
                                <span className={color}>{icon}</span>
                                {label}
                            </Link>
                        ))}

                        {/* زیرمنوی تیکت */}
                        <div className="border-b border-gray-200 pb-3">
                            <div
                                className="flex items-center gap-2 cursor-pointer text-gray-800 hover:text-black"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <AiOutlineMessage className="text-green-600"/>
                                <span className="text-[15px]">تیکت ها</span>
                                <FaAngleDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`}/>
                            </div>
                            <motion.div
                                initial={{height: 0, opacity: 0}}
                                animate={{height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0}}
                                transition={{duration: 0.3}}
                                className="overflow-hidden mt-2 ml-4"
                            >
                                <Link href="/User_Dashboard/ticket/new"
                                      className="block text-sm text-gray-600 hover:text-black mb-2">
                                    + جدید
                                </Link>
                                <Link href="/User_Dashboard/ticket/ticketAll"
                                      className="block text-sm text-gray-600 hover:text-black">
                                    تیکت‌ها
                                </Link>
                            </motion.div>
                        </div>

                        {menuItems.slice(-1).map(({href, icon, label, color}) => (
                            <Link
                                onClick={() =>startDelete({href,label})}
                                key={label}
                                href={href}
                                className={`flex items-center gap-3 text-[15px] text-gray-800 hover:text-black transition`}
                            >
                                <span className={color}>{icon}</span>
                                {label}
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* دسکتاپ: منو کناری */}
                <div className="hidden md:flex flex-col w-[320px] h-[680px] bg-white  shadow-md rounded-2xl p-6">
                    <div className="border-b border-gray-200 pb-4 mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">{user.user_name}</h2>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-sm text-gray-500">{user.mobile}</span>
                            <Link href={`/User_Dashboard/profile/${user.id}`}>
                                <AiTwotoneEdit className="text-blue-500 text-lg"/>
                            </Link>
                        </div>
                    </div>

                    {menuItems.slice(0, 2).map(({href, icon, label, color}) => (
                        <Link

                            key={label}
                            href={href}
                            className={`flex items-center gap-3 mb-5 text-gray-800 hover:text-black transition`}
                        >
                            <span className={color}>{icon}</span>
                            <span className="text-sm">{label}</span>
                        </Link>
                    ))}

                    {/* زیرمنوی تیکت */}
                    <div className="mb-5">
                        <div
                            className="flex items-center gap-2 text-gray-800 cursor-pointer hover:text-black"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <AiOutlineMessage className="text-green-600"/>
                            <span className="text-sm">تیکت ها</span>
                            <FaAngleDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`}/>
                        </div>
                        <motion.div
                            initial={{height: 0, opacity: 0}}
                            animate={{height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0}}
                            transition={{duration: 0.3}}
                            className="overflow-hidden ml-6 mt-2"
                        >
                            <Link href="/User_Dashboard/ticket/new"
                                  className="block text-sm text-gray-600 hover:text-black mb-2">
                                + جدید
                            </Link>
                            <Link href="/User_Dashboard/ticket/ticketAll"
                                  className="block text-sm text-gray-600 hover:text-black">
                                تیکت‌ها
                            </Link>
                        </motion.div>
                    </div>

                    {menuItems.slice(-1).map(({href, icon, label, color}) => (
                        <Link
                            onClick={() =>startDelete({href,label})}
                            key={label}
                            href={href}
                            className={`flex items-center gap-3 text-gray-800 hover:text-black transition`}
                        >
                            <span className={color}>{icon}</span>
                            <span className="text-sm">{label}</span>
                        </Link>
                    ))}
                </div>

                {/* محتوا */}
                <div className="w-full z-40">{children}</div>

                {/* نوتیفیکیشن بالا */}
                <div className="hidden md:block absolute -top-3 -left-10 text-3xl text-gray-600 md:text-4xl">
                    <IoNotificationsOutline/>
                </div>
            </div>
        </UserGuard>
    );
}

export default Layout;



