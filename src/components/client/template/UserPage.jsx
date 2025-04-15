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


function UserPage(props) {
    const state = useSelector((state) => state.cart);
    const [clientState, setClientState] = useState(null);

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
                        <span className="text-[12px]">امیر مسعود اسدی طلب</span>
                        <p className="text-[12px] mt-2">09302153874</p>
                    </div>
                    <Link href="@/components/client/template/UserPage">
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
                            <Link href="@/components/client/template/UserPage" className="text-[12px] flex items-center justify-center text-[#3083FF]">
                                <span className="ml-0 text-[12px]">مشاهده همه</span>
                                <FaAngleLeft/>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-10">
                        <div className="flex items-center justify-center gap-5">
                            <div className="flex flex-col items-center justify-between">
                                <Link className="text-[#3083FF] text-[23px] flex flex-col items-center justify-between group" href="@/components/client/template/UserPage">
                                    <span className="group-hover:animate-spin"><FiRefreshCcw/></span>
                                    <p className="text-[11px] mt-2">جاری</p>
                                </Link>
                            </div>
                            <div className="mr-5 flex flex-col items-center justify-between">
                                <Link className="text-[#3083FF] text-[11px] flex flex-col items-center justify-between group" href="@/components/client/template/UserPage">
                <span className="group-hover:animate-pulse p-1 text-[11px] border-2 rounded-xl border-blue-500">
                    <RiArrowGoBackFill/>
                </span>
                                    <p className="text-[11px] mt-2">تحویل شده</p>
                                </Link>
                            </div>
                            <div className="mr-5 flex flex-col items-center justify-between">
                                <Link className="text-[#3083FF] text-[11px] flex flex-col items-center justify-between group" href="@/components/client/template/UserPage">
                                    <span className="group-hover:animate-bounce"><PiCodesandboxLogo size="26"/></span>
                                    <p className="text-[11px] mt-1">مرجوعی شده</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex flex-col items-start justify-between ">
                    <div className="flex flex-col items-start justify-between">
                        <span className="text-black text-[14px]">سفارش های من</span>
                        <p className="w-[70px] h-[2px] bg-red-500 mt-1"></p>
                    </div>
                    <div className="w-[831px] h-[187px] mt-5 border border-slate-300 rounded-xl p-10">
                        <div className="flex items-center justify-center">
                            <div className=" flex flex-col items-center justify-between">
                                <Link
                                    className="text-[#3083FF] text-[30px] flex flex-col items-center justify-between group"
                                    href="@/components/client/template/UserPage">
                                    <span className="group-hover:animate-spin"><FiRefreshCcw/></span>
                                    <p className="text-[14px] mt-2">جاری</p>
                                </Link>
                            </div>
                            <div className="mr-36 flex flex-col items-center justify-between">
                                <Link
                                    className="text-[#3083FF] text-[30px] flex flex-col items-center justify-between group"
                                    href="@/components/client/template/UserPage">
                                    <span
                                        className="group-hover:animate-pulse p-2 text-[16px] border-2 rounded-xl border-blue-500"><RiArrowGoBackFill/></span>
                                    <p className="text-[14px] mt-2">تحویل شده</p>
                                </Link>
                            </div>
                            <div className="mr-36 flex flex-col items-center justify-between">
                                <Link
                                    className="text-[#3083FF] text-[30px] flex flex-col items-center justify-between group"
                                    href="@/components/client/template/UserPage">
                                    <span className="group-hover:animate-bounce"><PiCodesandboxLogo size="40"/></span>
                                    <p className="text-[14px] mt-1">مرجوعی شده</p>
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center justify-end mt-8">
                            <Link href="@/components/client/template/UserPage" className="text-[14px] flex items-center justify-center text-[#3083FF]">
                                <span className="ml-2">مشاهده همه</span>
                                <FaAngleLeft/>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-2 ml-10 md:ml-0">
                    <div className="flex items-center mt-10 text-[20px] md:text-[34px] justify-center  mr-9 w-[190px] md:w-auto border-b border-slate-300 md:border-0  md:justify-start">
                        <CiHeart color="red"/>
                        <span className="text-black text-[12px] md:text-[20px] font-bold">علاقه مندی ها</span>
                    </div>
                    {favoritesItem.length === 0 && <div
                        className="m-auto hidden md:flex items-center justify-center w-full relative top-20 right-80 left-0">
                        <span className="text-black">علاقه مندی ها خالی هست!</span>
                    </div>}
                    <div className="flex items-center justify-center flex-wrap mt-5 mr-10 md:mr-0 ">
                        {favoritesItem.map((images) => <CardProductImage key={images.id} id={images.id}
                                                                         product={images}/>)}
                    </div>
                </div>

            </div>

        </>
    );
}

export default UserPage;