"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";

function Layout({ children }) {
    const [isVisible, setIsVisible] = useState(true);
    const pathname = usePathname();

    const handleExit = () => {
        setIsVisible(false);
    };

    return (
        <>
            <div className="hidden md:flex flex-col items-start justify-between w-[831px] h-[553px] overflow-hidden border border-slate-300 rounded-xl mr-5 mt-10">
                <div className="flex flex-col items-start justify-between">
                    <div className="flex flex-col items-start justify-between mt-5 mr-5">
                        <span className="text-black text-[12px] font-bold">تاریخچه سفارشات</span>
                        <p className="w-[50px] h-[2px] bg-red-500 mt-1"></p>
                    </div>
                    <div className="flex items-start text-black pb-3 border-b border-slate-300 w-[831px]">
                        {["current", "delivered", "returned", "canceled"].map((status) => (
                            <Link key={status} className="mr-5 mt-5 group" href={`/User_Dashboard/orders/${status}`}>
                                <span
                                    className={`text-[14px] transition-all ${
                                        pathname.includes(status) ? "text-red-600 font-bold" : "group-hover:text-red-600 group-hover:font-bold"
                                    }`}
                                >
                                    {status === "current" ? "جاری" :
                                        status === "delivered" ? "تحویل شده" :
                                            status === "returned" ? "مرجوعی شده" : "لغو شده"}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-center m-auto">{children}</div>
            </div>

            {isVisible && (
                <div className="z-50 md:hidden flex flex-col absolute w-full h-screen bg-white right-0 transition-transform duration-500 ease-in-out transform translate-x-0">
                    <div className="mt-5 mr-5 flex items-center justify-start">
                        <button onClick={handleExit} className="text-black">
                            <FaArrowRightLong />
                        </button>
                        <span className="text-black mr-5 text-[16px]">تاریخچه سفارشات</span>
                    </div>
                    <div className="flex items-center justify-between text-black pb-3 w-[350px] mt-10">
                        {["current", "delivered", "returned", "canceled"].map((status) => (
                            <Link key={status} className="mr-5 mt-5 group" href={`/User_Dashboard/orders/${status}`}>
                                <span
                                    className={`text-[12px] transition-all ${
                                        pathname.includes(status) ? "text-red-600 font-bold" : "group-hover:text-red-600 group-hover:font-bold"
                                    }`}
                                >
                                    {status === "current" ? "جاری" :
                                        status === "delivered" ? "تحویل شده" :
                                            status === "returned" ? "مرجوعی شده" : "لغو شده"}
                                </span>
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-start justify-start mr-5 mt-10">{children}</div>
                </div>
            )}
        </>
    );
}

export default Layout;
