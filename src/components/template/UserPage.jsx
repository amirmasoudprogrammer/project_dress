"use client"
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {FiRefreshCcw} from "react-icons/fi";
import {RiArrowGoBackFill} from "react-icons/ri";
import {PiCodesandboxLogo} from "react-icons/pi";
import {FaAngleLeft} from "react-icons/fa";
import {CiHeart} from "react-icons/ci";
import {useSelector} from "react-redux";
import CardProductImage from "@/components/module/CardProductImage";
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
            <div className="container m-auto mr-5 flex flex-col items-start justify-between mt-10">
                <div className="flex items-center justify-between md:hidden border border-slate-300 mt-20 w-[250px] p-5">
                    <div className="text-black ">
                        <span>امیر مسعود اسدی طلب</span>
                        <p>09302153874</p>
                    </div>
                    <Link href="">
                        <AiTwotoneEdit color="blue"/>
                    </Link>
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
                                    href="">
                                    <span className="group-hover:animate-spin"><FiRefreshCcw/></span>
                                    <p className="text-[14px] mt-2">جاری</p>
                                </Link>
                            </div>
                            <div className="mr-36 flex flex-col items-center justify-between">
                                <Link
                                    className="text-[#3083FF] text-[30px] flex flex-col items-center justify-between group"
                                    href="">
                                    <span
                                        className="group-hover:animate-pulse p-2 text-[16px] border-2 rounded-xl border-blue-500"><RiArrowGoBackFill/></span>
                                    <p className="text-[14px] mt-2">تحویل شده</p>
                                </Link>
                            </div>
                            <div className="mr-36 flex flex-col items-center justify-between">
                                <Link
                                    className="text-[#3083FF] text-[30px] flex flex-col items-center justify-between group"
                                    href="">
                                    <span className="group-hover:animate-bounce"><PiCodesandboxLogo size="40"/></span>
                                    <p className="text-[14px] mt-1">مرجوعی شده</p>
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center justify-end mt-8">
                            <Link href="" className="text-[14px] flex items-center justify-center text-[#3083FF]">
                                <span className="ml-2">مشاهده همه</span>
                                <FaAngleLeft/>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-10 ml-10 md:ml-0">
                    <div className="flex items-center mt-10 justify-center border-b border-slate-300 md:border-0 m-auto md:justify-start">
                        <CiHeart color="red" size="40"/>
                        <span className="text-black md:text-[20px] font-bold">علاقه مندی ها</span>
                    </div>
                    {favoritesItem.length === 0 && <div className="m-auto flex items-center justify-center w-full relative top-20 right-80 left-0">
                        <span className="text-black">علاقه مندی ها خالی هست!</span>
                    </div>}
                    <div className="flex items-center justify-center flex-wrap mt-5  ">
                        {favoritesItem.map((images) => <CardProductImage key={images.id} id={images.id} product={images}/>)}
                    </div>
                </div>

            </div>

        </>
    );
}

export default UserPage;