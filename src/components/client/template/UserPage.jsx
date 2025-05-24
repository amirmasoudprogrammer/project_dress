"use client"
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {FiRefreshCcw} from "react-icons/fi";
import {RiArrowGoBackFill} from "react-icons/ri";
import {PiCodesandboxLogo} from "react-icons/pi";
import {FaAngleLeft} from "react-icons/fa";
import {CiHeart} from "react-icons/ci";
import {useSelector} from "react-redux";
import CardProductImage from "@/components/client/module/CardProductImage";
import {AiTwotoneEdit} from "react-icons/ai";
import OrderLink from "@/components/client/module/OrderLink";
import Cookies from "js-cookie";
import axios from "axios";


function UserPage(props) {
    const state = useSelector((state) => state.cart);
    const [clientState, setClientState] = useState(null);
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

console.log(user)

    useEffect(() => {
        setClientState(state);
    }, [state]);

    if (!clientState) return null; // جلوگیری از Hydration error
    const favoritesItem = state.favorites || []

    console.log(state)
    return (
        <>
            <div className="container m-auto md:mr-5 flex flex-col items-start justify-between mt-10">
                <div
                    className="flex items-center rounded-xl  justify-between md:hidden border border-slate-300 mt-12 w-[260px] p-5">
                    <div className="text-black ">
                        <span className="text-[12px]">{user.user_name}</span>
                        <p className="text-[12px] mt-2">{user.mobile}</p>
                    </div>
                    <Link href={`/User_Dashboard/profile/${user.id}`}>
                        <AiTwotoneEdit color="blue"/>
                    </Link>
                </div>
                <div className="block md:hidden">
                    <div className="flex items-center justify-between mt-10 w-[260px]">
                        <div className="flex flex-col items-start justify-between">
                            <span className="text-black text-[12px]">سفارش های من</span>
                            <p className="w-[50px] h-[2px] bg-red-500 mt-1"></p>
                        </div>
                        <div className="flex items-center justify-end ">
                            <Link href="@/components/client/template/UserPage"
                                  className="text-[12px] flex items-center justify-center text-[#3083FF]">
                                <span className="ml-0 text-[12px]">مشاهده همه</span>
                                <FaAngleLeft/>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-10">
                        <div className="flex items-center justify-center gap-5">
                            <div className="flex flex-col items-center justify-between">
                                <Link
                                    className="text-[#3083FF] text-[23px] flex flex-col items-center justify-between group"
                                    href="@/components/client/template/UserPage">
                                    <span className="group-hover:animate-spin"><FiRefreshCcw/></span>
                                    <p className="text-[11px] mt-2">جاری</p>
                                </Link>
                            </div>
                            <div className="mr-5 flex flex-col items-center justify-between">
                                <Link
                                    className="text-[#3083FF] text-[11px] flex flex-col items-center justify-between group"
                                    href="@/components/client/template/UserPage">
                <span className="group-hover:animate-pulse p-1 text-[11px] border-2 rounded-xl border-blue-500">
                    <RiArrowGoBackFill/>
                </span>
                                    <p className="text-[11px] mt-2">تحویل شده</p>
                                </Link>
                            </div>
                            <div className="mr-5 flex flex-col items-center justify-between">
                                <Link
                                    className="text-[#3083FF] text-[11px] flex flex-col items-center justify-between group"
                                    href="@/components/client/template/UserPage">
                                    <span className="group-hover:animate-bounce"><PiCodesandboxLogo size="26"/></span>
                                    <p className="text-[11px] mt-1">مرجوعی شده</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex flex-col gap-8 w-full">
                    {/* عنوان بخش سفارش‌ها */}
                    <div className="flex flex-col items-start">
                        <span className="text-black text-[20px] font-bold">سفارش‌های من</span>
                        <p className="w-[120px] h-[3px] bg-red-500 mt-1 rounded-full"></p>
                    </div>

                    {/* کارت سفارش‌ها */}
                    <div className="w-full bg-white shadow-lg border border-slate-200 rounded-2xl p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                            <OrderLink
                                href="@/components/client/template/UserPage"
                                icon={<FiRefreshCcw size={32}/>}
                                text="جاری"
                                animation="group-hover:animate-spin"
                            />
                            <OrderLink
                                href="@/components/client/template/UserPage"
                                icon={
                                    <div className="w-[40px] h-[40px] border-2 border-blue-500 rounded-full flex items-center justify-center">
                                        <RiArrowGoBackFill size={24} className="text-blue-500" />
                                    </div>
                                }
                                text="تحویل شده"
                                animation="group-hover:animate-pulse"
                            />

                            <OrderLink
                                href="@/components/client/template/UserPage"
                                icon={<PiCodesandboxLogo size={40}/>}
                                text="مرجوعی شده"
                                animation="group-hover:animate-bounce"
                            />
                        </div>

                        <div className="flex items-center justify-end mt-10">
                            <Link
                                href="@/components/client/template/UserPage"
                                className="text-sm flex items-center gap-1 text-[#3083FF] hover:underline"
                            >
                                <span>مشاهده همه</span>
                                <FaAngleLeft/>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* بخش علاقه‌مندی‌ها */}
                <div className="mt-16 w-full">
                    <div className="flex items-center gap-2 text-[20px] md:text-[28px] mb-6 border-b pb-2 w-fit">
                        <CiHeart className="text-red-500" size={30}/>
                        <span className="text-black font-bold">علاقه‌مندی‌ها</span>
                    </div>

                    {favoritesItem.length === 0 ? (
                        <div className="flex items-center justify-center w-full mt-20">
                            <span className="text-gray-500">لیست علاقه‌مندی‌ها خالی است!</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {favoritesItem.map((item) => (
                                <CardProductImage key={item.id} id={item.id} product={item}/>
                            ))}
                        </div>
                    )}
                </div>


            </div>

        </>
    );
}

export default UserPage;