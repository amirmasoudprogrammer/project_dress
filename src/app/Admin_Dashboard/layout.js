"use client";
import React, {useState} from 'react';
import Image from "next/image";
import {IoIosMenu, IoIosSearch} from "react-icons/io";
import {AiFillDashboard} from "react-icons/ai";
import {FaAngleDown, FaAngleRight, FaAngleUp, FaRegCircle} from "react-icons/fa6";
import Link from "next/link";
import {AnimatePresence, motion} from "framer-motion";
import {MdDiscount, MdOutlineCircle, MdOutlineIntegrationInstructions, MdOutlineMailOutline} from "react-icons/md";
import {BsFillBoxFill} from "react-icons/bs";
import {BiSolidCategory} from "react-icons/bi";
import {PiGraphDuotone, PiUsersThreeBold} from "react-icons/pi";
import {LuWarehouse} from "react-icons/lu";
import {TfiBag} from "react-icons/tfi";
import {IoLogoWechat, IoSettingsOutline, IoTicketSharp} from "react-icons/io5";
import {FaRegBell, FaRegFlag, FaStar} from "react-icons/fa";
import {GiHamburgerMenu, GiVerticalBanner} from "react-icons/gi";
import Profile from "@/components/admin/modules/Profile";
import AdminGuard from "@/app/Admin_Dashboard/AdminGuard";

function AdminLayout({children}) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const [activeDashboard, setActiveDashboard] = useState("");
    const [activeItem, setActiveItem] = useState("");
    const [activePanel, setActivePanel] = useState(false)


    const startClick = () => {
        setActivePanel(!activePanel)
    }

    return (
        <AdminGuard>
        <div className="relative flex items-start justify-between">
            {/* Sidebar */}
            <div className={`transition-all duration-300 h-[95vw] bg-[#333] ${isCollapsed ? "w-[50px]" : "w-[240px]"}`}>
                <p className="text-white text-center p-2 font-bold text-[21px] cursor-pointer bg-[#3c8dbc]/80 h-[50px]">
                    {isCollapsed ? "پنل" : "کنترل پنل ادمین"}
                </p>

                {/* یوزر */}
                <div className="flex items-center justify-center mt-3">
                    {isCollapsed ? (
                        <Image className="rounded-full" src="/image/photo_۲۰۲۵-۰۴-۲۵_۱۸-۴۹-۲۰.jpg" width={40} height={40} alt="icon"/>
                    ) : (
                        <>
                            <Image className="rounded-full h-[55px]" src="/image/photo_۲۰۲۵-۰۴-۲۵_۱۸-۴۹-۲۰.jpg" width={50} height={50} alt="icon"/>
                            <div className="-mt-1">
                                <span className="text-[14px] font-bold mr-3">امیر مسعود اسدی طلب</span>
                                <div className="flex items-center justify-start mr-2 mt-1">
                                    <p className="w-[10px] h-[10px] bg-[#3c763d] rounded-full"></p>
                                    <span className="text-[12px] mr-2 ">آنلاین</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* سرچ */}
                {!isCollapsed && (
                    <div
                        className={`flex mt-5 items-center justify-between w-[210px] h-[40px] m-auto rounded ${isClicked ? "bg-white" : "bg-[#374850]"}`}
                        onClick={() => setIsClicked(!isClicked)}
                    >
                        <input
                            type="text"
                            placeholder="جستجو"
                            className={`outline-0 border-0 pr-3 w-[180px] ${isClicked ? "bg-white text-black" : "bg-[#374850] text-white"}`}
                        />
                        <span className={`text-[20px] ml-5 ${isClicked ? "text-black" : "text-white"}`}>
                            <IoIosSearch/>
                        </span>
                    </div>
                )}

                {/* منو تیتر */}
                {!isCollapsed && (
                    <div className="bg-[#1a2226] w-auto h-[40px] flex items-center justify-start mt-2">
                        <span className="text-[#4b646f] mr-5 text-center mb-1 text-[13px]">منو</span>
                    </div>
                )}

                {/* داشبرد */}
                <div>
                    {isCollapsed ? (
                        <>
                            <div className="relative">
                                <div onClick={() => setActiveItem("Dashboard")}
                                     className={`relative group cursor-pointer flex items-center justify-center mt-5 ${activeItem === "Dashboard" ? "bg-[#1e282c]" : ""} p-3`}>
                                    <AiFillDashboard/>
                                    {activeItem === "Dashboard" && (
                                        <div className="absolute right-[47px] bg-[#00c0ef] w-[3px] h-[40px]"></div>
                                    )}
                                    <div
                                        className="hidden group-hover:block absolute rounded w-[200px] h-[100px] z-[90]  right-[51px] -top-2">
                                        <div
                                            className="flex items-center justify-around mt-2 bg-[#1e282c] rounded p-3 ">
                                            <span>داشبرد</span>
                                            <p><FaAngleRight/></p>
                                        </div>
                                        <div className="p-3 rounded bg-[#2c3b41]">
                                            <Link href="/Admin_Dashboard/Dashboard/DashboardOne"
                                                  className="flex items-center text-[14px]">
                                                <FaRegCircle/>
                                                <span className="mr-2">داشبرد اول</span>
                                            </Link>
                                            <Link href="/Admin_Dashboard/Dashboard/DboaashrdTwo"
                                                  className="flex items-center text-[14px] mt-2">
                                                <FaRegCircle/>
                                                <span className="mr-2">داشبرد دوم</span>
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                className={`flex items-center justify-between p-3 cursor-pointer transition-colors relative ${
                                    activeItem === "Dashboard" ? "bg-[#1e282c]" : ""
                                }`} onClick={() => {
                                setIsDashboardOpen(!isDashboardOpen);
                                setActiveItem("Dashboard");
                            }}>
                                <div className="flex items-center">
                                    <AiFillDashboard/>
                                    <span className="mr-2 font-bold text-[12px]">داشبورد</span>
                                </div>
                                <div className="relative flex items-center justify-end">
                                    {isDashboardOpen ? <FaAngleUp/> : <FaAngleDown/>}
                                    {activeItem === "Dashboard" && (
                                        <div className=" absolute right-6 bg-[#00c0ef] w-[4px] h-[40px]"></div>
                                    )}
                                </div>

                            </div>

                            <AnimatePresence initial={false}>
                                {isDashboardOpen && (
                                    <motion.div
                                        key="dashboard-submenu"
                                        initial={{height: 0}}
                                        animate={{height: "auto"}}
                                        exit={{height: 0}}
                                        transition={{duration: 0.3}}
                                        className="overflow-hidden"
                                    >
                                        <Link href="/Admin_Dashboard/Dashboard/DashboardOne"
                                              onClick={() => setActiveDashboard("one")}
                                              className={`flex items-center p-2 cursor-pointer transition-colors ${
                                                  activeDashboard === "one" ? "bg-[#00c0ef]" : "bg-[#2c3b41]"
                                              }`}
                                        >
                                            <MdOutlineCircle/>
                                            <span className="mr-2 text-[12px]">داشبورد اول</span>
                                        </Link>

                                        <Link
                                            href="/Admin_Dashboard/Dashboard/DashboardTwo"
                                            onClick={() => setActiveDashboard("two")}
                                            className={`flex items-center p-2 cursor-pointer transition-colors ${
                                                activeDashboard === "two" ? "bg-[#00c0ef]" : "bg-[#2c3b41]"
                                            }`}
                                        >
                                            <MdOutlineCircle/>
                                            <span className="mr-2 text-[12px]">داشبورد دوم</span>
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </>
                    )}

                </div>

                {/*مدیریت محصولات*/}
                {isCollapsed ? (
                    <>
                        <Link onClick={() => setActiveItem("product")} href="/Admin_Dashboard/Product"
                              className={`relative group flex items-center mt-2 ${activeItem === "product" ? "bg-[#1e282c]" : ""}  p-3`}>
                            <BsFillBoxFill/>
                            <div
                                className="hidden group-hover:flex absolute bg-[#1e282c] w-[150px] h-[40px] right-[50px] flex items-center z-[90] pr-2 rounded">
                                مدیریت محصولات
                            </div>
                            {activeItem === "product" && (
                                <div className="absolute right-[47px] bg-[#00c0ef] w-[3px] h-[40px]"></div>
                            )}
                        </Link>
                    </>
                ) : (
                    <Link onClick={() => setActiveItem("product")} href="/Admin_Dashboard/Product"
                          className={`relative flex items-center mt-2 ${activeItem === "product" ? "bg-[#1e282c]" : ""}  p-3`}>
                        <BsFillBoxFill/>
                        <span className="text-[12px] mr-2">مدیریت محصولات</span>
                        {activeItem === "product" && (
                            <div className=" absolute left-0 bg-[#00c0ef] w-[4px] h-[40px]"></div>
                        )}
                    </Link>
                )}


                {/* دست بندی ها*/}
                {isCollapsed ? (
                    <>
                        <Link onClick={() => setActiveItem("Categories")} href="/Admin_Dashboard/Categories"
                              className="relative group flex items-center mt-2  p-3">
                            <BiSolidCategory/>
                            <div
                                className="hidden group-hover:flex absolute bg-[#1e282c] w-[150px] h-[40px] right-[50px] z-[90] flex items-center pr-2 rounded">
                                دست بندی ها
                            </div>
                            {activeItem === "Categories" && (
                                <div className="absolute right-[47px] bg-[#00c0ef] w-[3px] h-[40px]"></div>
                            )}
                        </Link>
                    </>
                ) : (
                    <Link onClick={() => setActiveItem("Categories")} href="/Admin_Dashboard/Categories"
                          className={`relative flex items-center mt-2 ${activeItem === "Categories" ? "bg-[#1e282c]" : ""}  p-3`}>
                        <BiSolidCategory/>
                        <span className="text-[12px] mr-2">دست بندی ها</span>
                        {activeItem === "Categories" && (
                            <div className=" absolute left-0 bg-[#00c0ef] w-[4px] h-[40px]"></div>
                        )}
                    </Link>
                )}

                {/*  مدیریت سفارشات*/}

                {isCollapsed ? (
                    <>
                        <Link onClick={() => setActiveItem("Orders")} href="/Admin_Dashboard/Orders"
                              className="relative group flex items-center mt-2  p-3">
                            <MdOutlineIntegrationInstructions/>
                            <div
                                className="hidden group-hover:flex absolute bg-[#1e282c] w-[150px] h-[40px]  z-[90] right-[50px] flex items-center pr-2 rounded">
                                مدیریت سفارشات
                            </div>
                            {activeItem === "Orders" && (
                                <div className="absolute right-[47px] bg-[#00c0ef] w-[3px] h-[40px]"></div>
                            )}
                        </Link>
                    </>
                ) : (
                    <Link onClick={() => setActiveItem("Orders")} href="/Admin_Dashboard/Orders"
                          className={`relative flex ${activeItem === "Orders" ? "bg-[#1e282c]" : ""} items-center mt-2  p-3`}>
                        <MdOutlineIntegrationInstructions/>
                        <span className="text-[12px] mr-2">مدیریت سفارشات</span>
                        {activeItem === "Orders" && (
                            <div className=" absolute left-0 bg-[#00c0ef] w-[4px] h-[40px]"></div>
                        )}
                    </Link>
                )}


                {/* مدیریت کاربران*/}
                {isCollapsed ? (
                    <>
                        <Link onClick={() => setActiveItem("Users")} href="/Admin_Dashboard/Users"
                              className="relative group flex items-center mt-2  p-3">
                            <PiUsersThreeBold/>
                            <div
                                className="hidden group-hover:flex absolute bg-[#1e282c] w-[150px] h-[40px] right-[50px]  z-[90] flex items-center pr-3 rounded">
                                مدیریت کاربران
                            </div>
                            {activeItem === "Users" && (
                                <div className="absolute right-[47px] bg-[#00c0ef] w-[3px] h-[40px]"></div>
                            )}
                        </Link>
                    </>
                ) : (
                    <Link onClick={() => setActiveItem("Users")} href="/Admin_Dashboard/Users"
                          className={`relative ${activeItem === "Users" ? "bg-[#1e282c]" : ""} flex items-center mt-2  p-3`}>
                        <PiUsersThreeBold/>
                        <span className="text-[12px] mr-2">مدیریت کاربران</span>
                        {activeItem === "Users" && (
                            <div className=" absolute left-0 bg-[#00c0ef] w-[4px] h-[40px]"></div>
                        )}
                    </Link>
                )}


                {/*موجودی انبار*/}

                {isCollapsed ? (
                    <>
                        <Link onClick={() => setActiveItem("Warehouse")} href="/Admin_Dashboard/Warehouse"
                              className="relative group flex items-center mt-2  p-3">
                            <LuWarehouse/>
                            <div
                                className="hidden group-hover:flex absolute bg-[#1e282c] w-[150px] h-[40px] right-[50px] z-[90] flex items-center pr-2 rounded">
                                موجودی انبار
                            </div>
                            {activeItem === "Warehouse" && (
                                <div className="absolute right-[47px] bg-[#00c0ef] w-[3px] h-[40px]"></div>
                            )}
                        </Link>
                    </>
                ) : (
                    <Link onClick={() => setActiveItem("Warehouse")} href="/Admin_Dashboard/Warehouse"
                          className={`relative flex ${activeItem === "Warehouse" ? "bg-[#1e282c]" : ""} items-center mt-2  p-3`}>
                        <LuWarehouse/>
                        <span className="text-[12px] mr-2">موجودی انبار</span>
                        {activeItem === "Warehouse" && (
                            <div className=" absolute left-0 bg-[#00c0ef] w-[4px] h-[40px]"></div>
                        )}
                    </Link>

                )}


                {/*تخفیفات*/}
                {isCollapsed ? (
                    <>
                        <Link onClick={() => setActiveItem("Discounts")} href="/Admin_Dashboard/Discounts"
                              className="relative group flex items-center mt-2  p-3">
                            <MdDiscount/>
                            <div
                                className="hidden group-hover:flex absolute bg-[#1e282c] w-[150px] h-[40px] right-[50px] z-[90] flex items-center pr-2 rounded">
                                تخفیفات
                            </div>
                            {activeItem === "Discounts" && (
                                <div className="absolute right-[47px] bg-[#00c0ef] w-[3px] h-[40px]"></div>
                            )}
                        </Link>
                    </>
                ) : (
                    <Link onClick={() => setActiveItem("Discounts")} href="/Admin_Dashboard/Discounts"
                          className={`relative flex ${activeItem === "Discounts" ? "bg-[#1e282c]" : ""} items-center mt-2  p-3`}>
                        <MdDiscount/>
                        <span className="text-[12px] mr-2">تخفیفات</span>
                        {activeItem === "Discounts" && (
                            <div className=" absolute left-0 bg-[#00c0ef] w-[4px] h-[40px]"></div>
                        )}
                    </Link>
                )}


                {/*مدیریت وبلاگ*/}
                {isCollapsed ? (
                    <>
                        <Link onClick={() => setActiveItem("Blogs")} href="/Admin_Dashboard/Blogs"
                              className="relative group flex items-center mt-2  p-3">
                            <PiGraphDuotone/>
                            <div
                                className="hidden group-hover:flex absolute bg-[#1e282c] w-[150px] h-[40px] z-[90] right-[50px] flex items-center pr-2 rounded">
                                مدیریت وبلاگ
                            </div>
                            {activeItem === "Blogs" && (
                                <div className="absolute right-[47px] bg-[#00c0ef] w-[3px] h-[40px]"></div>
                            )}
                        </Link>
                    </>
                ) : (
                    <Link onClick={() => setActiveItem("Blogs")} href="/Admin_Dashboard/Blogs"
                          className={`relative flex ${activeItem === "Blogs" ? "bg-[#1e282c]" : ""} items-center mt-2  p-3`}>
                        <PiGraphDuotone/>
                        <span className="text-[12px] mr-2">مدیریت وبلاگ</span>
                        {activeItem === "Blogs" && (
                            <div className=" absolute left-0 bg-[#00c0ef] w-[4px] h-[40px]"></div>
                        )}
                    </Link>
                )}


                {/*مدیریت صفحات*/}
                {isCollapsed ? (
                    <>
                        <Link onClick={() => setActiveItem("Pages")} href="/Admin_Dashboard/Pages"
                              className="relative group flex items-center mt-2  p-3">
                            <TfiBag/>
                            <div
                                className="hidden group-hover:flex absolute bg-[#1e282c] w-[150px] h-[40px] right-[50px] z-[90] flex items-center pr-2 rounded">
                                مدیریت صفحات
                            </div>
                            {activeItem === "Pages" && (
                                <div className="absolute right-[47px] bg-[#00c0ef] w-[3px] h-[40px]"></div>
                            )}
                        </Link>
                    </>
                ) : (
                    <Link onClick={() => setActiveItem("Pages")} href="/Admin_Dashboard/Pages"
                          className={`relative flex ${activeItem === "Pages" ? "bg-[#1e282c]" : ""} items-center mt-2  p-3`}>
                        <TfiBag/>
                        <span className="text-[12px] mr-2">مدیریت صفحات</span>
                        {activeItem === "Pages" && (
                            <div className=" absolute left-0 bg-[#00c0ef] w-[4px] h-[40px]"></div>
                        )}
                    </Link>
                )}

                {/*مدیریت نظرات*/}
                {isCollapsed ? (
                    <>
                        <Link onClick={() => setActiveItem("Comments")} href="/Admin_Dashboard/Comments"
                              className="relative group flex items-center mt-2  p-3">
                            <IoLogoWechat/>
                            <div
                                className="hidden group-hover:flex absolute bg-[#1e282c] w-[150px] h-[40px] right-[50px] z-[90] flex items-center pr-2 rounded">
                                مدیریت نظرات
                            </div>
                            {activeItem === "Comments" && (
                                <div className="absolute right-[47px] bg-[#00c0ef] w-[3px] h-[40px]"></div>
                            )}
                        </Link>
                    </>
                ) : (
                    <Link onClick={() => setActiveItem("Comments")} href="/Admin_Dashboard/Comments"
                          className={`relative flex ${activeItem === "Comments" ? "bg-[#1e282c]" : ""} items-center mt-2  p-3`}>
                        <IoLogoWechat/>
                        <span className="text-[12px] mr-2">مدیریت نظرات</span>
                        {activeItem === "Comments" && (
                            <div className=" absolute left-0 bg-[#00c0ef] w-[4px] h-[40px]"></div>
                        )}
                    </Link>
                )}

                {/*نظرات محصولات*/}
                {isCollapsed ? (
                    <>
                        <Link onClick={() => setActiveItem("Products_Comments")}
                              href="/Admin_Dashboard/Products_Comments"
                              className="relative group flex items-center mt-2  p-3">
                            <FaStar/>
                            <div
                                className="hidden group-hover:flex absolute bg-[#1e282c] w-[150px] h-[40px] right-[50px] z-[90] flex items-center pr-2 rounded">
                                نظرات محصولات
                            </div>
                            {activeItem === "Products_Comments" && (
                                <div className="absolute right-[47px] bg-[#00c0ef] w-[3px] h-[40px]"></div>
                            )}
                        </Link>
                    </>
                ) : (
                    <Link onClick={() => setActiveItem("Products_Comments")} href="/Admin_Dashboard/Products_Comments"
                          className={`relative flex ${activeItem === "Products_Comments" ? "bg-[#1e282c]" : ""} items-center mt-2  p-3`}>
                        <FaStar/>
                        <span className="text-[12px] mr-2">نظرات محصولات</span>
                        {activeItem === "Products_Comments" && (
                            <div className=" absolute left-0 bg-[#00c0ef] w-[4px] h-[40px]"></div>
                        )}
                    </Link>
                )}

                {/*مدیریت بنرها*/}
                {isCollapsed ? (
                    <>
                        <Link onClick={() => setActiveItem("Banners")} href="/Admin_Dashboard/Banners"
                              className="relative group flex items-center mt-2  p-3">
                            <GiVerticalBanner/>
                            <div
                                className="hidden group-hover:flex absolute bg-[#1e282c] w-[150px] h-[40px] right-[50px] z-[90] flex items-center pr-2 rounded">
                                مدیریت بنرها
                            </div>
                            {activeItem === "Banners" && (
                                <div className="absolute right-[47px] bg-[#00c0ef] w-[3px] h-[40px]"></div>
                            )}
                        </Link>
                    </>
                ) : (
                    <Link onClick={() => setActiveItem("Banners")} href="/Admin_Dashboard/Banners"
                          className={`relative flex ${activeItem === "Banners" ? "bg-[#1e282c]" : ""} items-center mt-2  p-3`}>
                        <GiVerticalBanner/>
                        <span className="text-[12px] mr-2">مدیریت بنرها</span>
                        {activeItem === "Banners" && (
                            <div className=" absolute left-0 bg-[#00c0ef] w-[4px] h-[40px]"></div>
                        )}
                    </Link>
                )}

                {/*تیکت های پشتیبانی*/}
                {isCollapsed ? (
                    <>
                        <Link onClick={() => setActiveItem("ticket")} href="/Admin_Dashboard/ticket"
                              className="relative group flex items-center mt-2  p-3">
                            <IoTicketSharp/>
                            <div
                                className="hidden group-hover:flex absolute bg-[#1e282c] w-[150px] h-[40px] z-[90] right-[50px] flex items-center pr-2 rounded">
                                تیکت های پشتیبانی
                            </div>
                            {activeItem === "ticket" && (
                                <div className="absolute right-[47px] bg-[#00c0ef] w-[3px] h-[40px]"></div>
                            )}
                        </Link>
                    </>
                ) : (
                    <Link onClick={() => setActiveItem("ticket")} href="/Admin_Dashboard/ticket"
                          className={`relative flex ${activeItem === "ticket" ? "bg-[#1e282c]" : ""} items-center mt-2  p-3`}>
                        <IoTicketSharp/>
                        <span className="text-[12px] mr-2">تیکت های پشتیبانی</span>
                        {activeItem === "ticket" && (
                            <div className=" absolute left-0 bg-[#00c0ef] w-[4px] h-[40px]"></div>
                        )}
                    </Link>
                )}


                {/*مدیریت منو ها*/}
                {isCollapsed ? (
                    <>
                        <Link onClick={() => setActiveItem("Menus")} href="/Admin_Dashboard/Menus"
                              className="relative group flex items-center mt-2  p-3">
                            <IoIosMenu/>
                            <div
                                className="hidden group-hover:flex absolute bg-[#1e282c] w-[150px] h-[40px] z-[90] right-[50px] flex items-center pr-2 rounded">
                                مدیریت منو ها
                            </div>
                            {activeItem === "Menus" && (
                                <div className="absolute right-[47px] bg-[#00c0ef] w-[3px] h-[40px]"></div>
                            )}
                        </Link>
                    </>
                ) : (
                    <Link onClick={() => setActiveItem("Menus")} href="/Admin_Dashboard/Menus"
                          className={`relative flex ${activeItem === "Menus" ? "bg-[#1e282c]" : ""} items-center mt-2  p-3`}>
                        <IoIosMenu/>
                        <span className="text-[12px] mr-2">مدیریت منو ها</span>
                        {activeItem === "Menus" && (
                            <div className=" absolute left-0 bg-[#00c0ef] w-[4px] h-[40px]"></div>
                        )}
                    </Link>
                )}

                {/*تنظیمات*/}
                {isCollapsed ? (
                    <>
                        <Link onClick={() => setActiveItem("Settings")} href="/Admin_Dashboard/Settings"
                              className="relative group flex items-center mt-2  p-3">
                            <IoSettingsOutline/>
                            <div
                                className="hidden group-hover:flex absolute bg-[#1e282c] w-[150px] h-[40px] right-[50px] z-[90] flex items-center pr-2 rounded">
                                تنظیمات
                            </div>
                            {activeItem === "Settings" && (
                                <div className="absolute right-[47px] bg-red-500 w-[3px] h-[40px]"></div>
                            )}
                        </Link>
                    </>
                ) : (
                    <Link onClick={() => setActiveItem("Settings")} href="/Admin_Dashboard/Settings"
                          className={`relative flex  ${activeItem === "Settings" ? "bg-red-500" : ""}  items-center mt-2  p-3`}>
                        <IoSettingsOutline/>
                        <span className="text-[12px] mr-2">تنظیمات</span>
                        {activeItem === "Settings" && (
                            <div className=" absolute left-0 bg-red-500 w-[4px] h-[40px]"></div>
                        )}
                    </Link>
                )}


            </div>

            {/* Main Content + Topbar */}
            <div className=" flex items-center justify-between flex-col flex-1 z-50">
                <div
                    className={`fixed left-[${isCollapsed ? "60px" : "240px"}] top-0 transition-all duration-300 h-[50px] bg-[#3c8dbc] flex items-center justify-between z-50 ${
                        isCollapsed ? "w-[calc(100%-50px)]" : "w-[calc(100%-240px)]"
                    }`}
                >
                    <div className="cursor-pointer hover:bg-[rgba(0,0,0,0.1)] p-4"
                         onClick={() => setIsCollapsed(!isCollapsed)}>
                        <GiHamburgerMenu/>
                    </div>

                    {/* آیکن‌ها */}
                    <div className="flex items-center justify-end">
                        <div className="relative ml-2 cursor-pointer hover:bg-[rgba(0,0,0,0.1)] p-4">
                            <p className="absolute right-7 top-2 text-[13px] w-[14px] h-[14px] bg-green-500 text-white rounded-full flex items-center justify-center">4</p>
                            <MdOutlineMailOutline/>
                        </div>
                        <div className="relative ml-2 cursor-pointer hover:bg-[rgba(0,0,0,0.1)] p-4">
                            <p className="absolute right-7 top-2 text-[13px] w-[14px] h-[14px] bg-[#f39c12] text-white rounded-full flex items-center justify-center">10</p>
                            <FaRegBell/>
                        </div>
                        <div className="relative ml-2 cursor-pointer hover:bg-[rgba(0,0,0,0.1)] p-4">
                            <p className="absolute right-7 top-2 text-[13px] w-[14px] h-[14px] bg-red-500 text-white rounded-full flex items-center justify-center">9</p>
                            <FaRegFlag/>
                        </div>
                        <div
                            className="ml-10 hover:bg-[rgba(0,0,0,0.1)] flex items-center justify-center cursor-pointer p-2 focus:outline-none"
                            onClick={startClick}>
                            <Image className="rounded-full ml-2 h-[35px]" src="/image/photo_۲۰۲۵-۰۴-۲۵_۱۸-۴۹-۲۰.jpg"
                                   width={30} height={30} alt="icon"/>
                            <span className="text-white text-[12px]">امیرمسعود اسدی طلب</span>
                            {activePanel && (
                                <Profile/>
                            )}
                        </div>
                    </div>


                </div>

                <div className="relative z-[10] w-full h-[76vw] text-black top-[50px]">
                    {children}
                </div>

            </div>
        </div>
        </AdminGuard>
    );
}

export default AdminLayout;
