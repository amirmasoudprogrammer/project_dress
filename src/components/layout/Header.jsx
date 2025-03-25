"use client"
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import {MdOutlineDarkMode} from "react-icons/md";
import {IoBagOutline} from "react-icons/io5";
import {FaRegUser} from "react-icons/fa";
import {TiPhoneOutline} from "react-icons/ti";

const menuItems = [
    {name: "صفحه اصلی", href: "/"},
    {name: "محصولات ما", href: "/Products"},
    {name: "درباره ما", href: "/About"},
    {name: "تماس با ما", href: "/Contact"},
    {name: "فروشگاه ما", href: "/store"},
];

const icons = [
    {src: "/Group 9.svg", alt: "Notifications", size: 20},
    {src: <FaRegUser/>, alt: "Profile", size: 24},
    {icon: <IoBagOutline/>, alt: "Shopping Bag", size: 24},
];

function Header() {
    const [darkMode, setDarkMode] = useState(false);


    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark");
    };

    return (
        <header>
            {/* دسکتاپ */}
            <div className="container relative z-10 mt-2 mx-auto hidden md:flex flex-col items-end">
                <div className="w-full flex justify-between items-center">
                    {/* لوگو و منو */}
                    <div className="flex items-center justify-between">
                        <div className=" relative top-3">
                            <Link href="/" className="w-20 ">
                                <Image src="/Group 946.svg" alt="Logo" width={90} height={90}/>
                            </Link>
                        </div>

                        <nav>
                            <ul className="flex items-center mr-10 space-x-5 rtl:space-x-reverse">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item.href} className="text-black relative flex flex-wrap gap-3">
                                            <p className="text-lg group relative w-max">
                                                <span className="font-normal text-sm dark:text-white">{item.name}</span>
                                                <span
                                                    className="absolute -bottom-1 right-0 w-0 transition-all h-0.5 bg-slate-50 group-hover:w-full"></span>
                                            </p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* آیکون‌ها */}
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">

                        <Link href="/">
                            <div
                                className="bg-white  dark:bg-gray-800 shadow-lg p-3 rounded-full flex items-center justify-center w-12 h-12">
                                <TiPhoneOutline color={!darkMode ? "black" : "white"}/>
                            </div>
                        </Link>

                        <button
                            onClick={toggleDarkMode}
                            className={`${!darkMode ? 'bg-white' : 'dark:bg-gray-800'}  shadow-lg p-3 rounded-full flex items-center justify-center w-12 h-12`}
                        >
                            {darkMode ? (
                                <MdOutlineDarkMode color={!darkMode ? "black" : "white"}/>
                            ) : (
                                <Image src="/Sun.svg" alt="Light Mode" width={24} height={24}/>
                            )}
                        </button>
                        <Link href="/Login&Registration">
                            <div
                                className="bg-white dark:bg-gray-800 shadow-lg p-3 rounded-full flex items-center justify-center w-12 h-12">
                                <FaRegUser color={!darkMode ? "black" : "white"}/>
                            </div>
                        </Link>
                        <Link href="/Shopping_Cart">
                            <div
                                className="bg-white dark:bg-gray-800 shadow-lg p-3 rounded-full flex items-center justify-center w-12 h-12">
                                <IoBagOutline color={!darkMode ? "black" : "white"}/>
                            </div>
                        </Link>


                    </div>
                </div>

                {/* نوار جستجو */}
                <div
                    className="flex border border-gray-300  dark:bg-gray-800 dark:border border-gray-400  mt-5 bg-slate-50 p-2 rounded w-[350px] items-center">
                    <Image src="/Search-01.svg" alt="Search Icon" width={20} height={20}/>
                    <input type="text" className=" dark:bg-gray-800 dark:text-white w-full outline-none text-black pr-2"
                           placeholder="جستجو کنید..."/>
                </div>
            </div>


            {/* موبایل */}
            <div className="container relative z-10 mt-2 mx-auto flex justify-between md:hidden items-center px-4">
                {/* دکمه‌ی منو */}


                {/* لوگو */}
                <Link href="/" className="w-16">
                    <Image src="/Group 946.svg" alt="Logo" width={80} height={80}/>
                </Link>

                {/* آیکون‌ها */}
                <div className="flex space-x-3 rtl:space-x-reverse">
                    <Link className="bg-slate-50 p-3 rounded-full w-12 h-12 flex items-center justify-center" href="/">
                        <Image src="/Sun.svg" alt="icon" width={24} height={24}/>
                    </Link>
                    <Link className="bg-slate-50 p-3 rounded-full w-12 h-12 flex items-center justify-center" href="/">
                        <Image src="/Search-01.svg" alt="Search Icon" width={24} height={24}/>
                    </Link>
                </div>
            </div>


        </header>
    );
}

export default Header;
