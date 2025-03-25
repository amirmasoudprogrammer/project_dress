"use client";
import React, {useState} from "react";
import {AiTwotoneEdit, AiOutlineMessage} from "react-icons/ai";
import {IoBagOutline} from "react-icons/io5";
import {CiHeart, CiLogin} from "react-icons/ci";
import {FaAngleDown} from "react-icons/fa6";
import {RxHamburgerMenu} from "react-icons/rx";
import { IoNotificationsOutline } from "react-icons/io5";

import Link from "next/link";
import {motion} from "framer-motion";

function Layout({children}) {
    const [isOpen, setIsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <div className="container m-auto flex md:flex-row items-start justify-between relative">
                {/* دکمه منوی موبایل */}

                    <div className="flex md:hidden text-black mr-5 items-center mt-10 justify-center">
                        <button onClick={() => setMenuOpen(true)} className="text-2xl">
                            <RxHamburgerMenu/>
                        </button>
                    </div>

                {/* منوی موبایل */}
                <motion.div initial={{x: "200%"}} animate={{x: menuOpen ? "0%" : "250%"}} transition={{duration: 0.3}} className="fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg z-50 p-5 md:hidden">
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="text-red-600 text-2xl absolute top-4 left-4"
                    >
                        ✖
                    </button>


                    <div className="flex flex-col items-start mt-10 space-y-5">
                        <Link href="/User_Dashboard/orders"
                              className="flex items-center text-black  w-[243px]  border-b border-slate-300 m-auto pb-2">
                            <IoBagOutline/>
                            <span className="mr-2 text-[14px]">سفارش ها</span>
                        </Link>
                        <Link href="/User_Dashboard/favorites"
                              className="flex items-center text-black  w-[243px]  border-b border-slate-300 m-auto pb-2">
                            <CiHeart/>
                            <span className="mr-2 text-[14px]">علاقه مندی ها</span>
                        </Link>

                        <div
                            className="flex flex-col items-start justify-between  w-[243px]  border-b border-slate-300 m-auto pb-2 ">
                            <div
                                className="flex items-center justify-start text-black  cursor-pointer"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <AiOutlineMessage/>
                                <span className="mr-2 ml-2 text-[14px]">تیکت ها</span>
                                <FaAngleDown
                                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}/>
                            </div>
                            <motion.div
                                initial={{height: 0, opacity: 0}}
                                animate={{height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0}}
                                transition={{duration: 0.3}}
                                className="overflow-hidden"
                            >
                                <div className="flex mr-2">
                                    <span className="w-[1px] h-24 bg-black"></span>
                                    <div className="mt-2 flex flex-col mr-2">
                                        <div className="flex items-center justify-center relative left-5">
                                            <span
                                                className="w-2 h-2 bg-black rounded-full mt-2 ml-2 border-2 border-white"></span>
                                            <Link href="/User_Dashboard/ticket/new"
                                                  className="text-black mt-2 text-[14px]">جدید</Link>
                                        </div>
                                        <div className="flex items-center justify-center relative left-3">
                                            <span
                                                className="w-2 h-2 bg-black rounded-full mt-5 ml-2 border-2 border-white"></span>
                                            <Link href="/User_Dashboard/ticket/ticketAll"
                                                  className="text-black mt-5 text-[14px]">تیکت ها</Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>


                        <Link href="" className="flex items-center text-black">
                            <CiLogin/>
                            <span className="mr-2 text-[14px]">خروج</span>
                        </Link>
                    </div>
                </motion.div>
                {/* دستکتاپ */}
                <div className="hidden md:block border  border-slate-300 w-[369px] h-[650px] mt-10 rounded-lg">
                    <div className="mt-12 text-[16px] w-[341px] border-b border-slate-300 m-auto pb-2">
                        <div className="mr-2 flex items-start justify-between flex-col">
                            <span className="text-black">امیرمسعود اسدی طلب</span>
                        </div>
                        <div className="flex items-center justify-between mr-2">
                            <p className="text-[#626262] mt-1">09302153874</p>
                            <Link href="" className="ml-5">
                                <AiTwotoneEdit color="blue"/>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-between mr-5 mt-10 ">
                        <div className="flex items-start justify-start border-b border-slate-300 w-[321px] pb-3">
                            <Link href="/User_Dashboard/orders" className="flex items-center justify-center text-black">
                                <IoBagOutline/>
                                <span className="mr-2 text-[14px]">سفارش ها</span>
                            </Link>
                        </div>
                        <div className="flex mt-5 items-start justify-start border-b border-slate-300 w-[321px] pb-5">
                            <Link href="/User_Dashboard/favorites"
                                  className="flex items-center justify-center text-black">
                                <CiHeart/>
                                <span className="mr-2 text-[14px]">علاقه مندی ها</span>
                            </Link>
                        </div>
                        <div
                            className="flex flex-col items-start justify-between w-[321px] border-b border-slate-300 pb-5">
                            <div
                                className="flex items-center justify-start text-black mt-3 cursor-pointer"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <AiOutlineMessage/>
                                <span className="mr-2 ml-2 text-[14px]">تیکت ها</span>
                                <FaAngleDown
                                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}/>
                            </div>
                            <motion.div
                                initial={{height: 0, opacity: 0}}
                                animate={{height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0}}
                                transition={{duration: 0.3}}
                                className="overflow-hidden"
                            >
                                <div className="flex mr-2">
                                    <span className="w-[1px] h-24 bg-black"></span>
                                    <div className="mt-2 flex flex-col mr-2">
                                        <div className="flex items-center justify-center relative left-5">
                                            <span
                                                className="w-2 h-2 bg-black rounded-full mt-2 ml-2 border-2 border-white"></span>
                                            <Link href="/User_Dashboard/ticket/new"
                                                  className="text-black mt-2 text-[14px]">جدید</Link>
                                        </div>
                                        <div className="flex items-center justify-center relative left-3">
                                            <span
                                                className="w-2 h-2 bg-black rounded-full mt-5 ml-2 border-2 border-white"></span>
                                            <Link href="/User_Dashboard/ticket/ticketAll"
                                                  className="text-black mt-5 text-[14px]">تیکت ها</Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <div className="flex mt-5 items-start justify-start pb-5">
                            <Link href="" className="flex items-center justify-center text-black">
                                <CiLogin/>
                                <span className="mr-2 text-[14px]">خروج</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div>{children}</div>
                <div className=" flex items-center justify-between mt-9 ml-6 md:mr-20 md:mt-5 text-black cursor-pointer md:text-[34px] text-[30px]">
                    <span><IoNotificationsOutline /></span>
                </div>

            </div>
        </>
    );
}

export default Layout;


