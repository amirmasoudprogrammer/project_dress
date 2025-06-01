"use client"
import React, {useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import {MdOutlineDarkMode} from "react-icons/md";
import {IoBagOutline} from "react-icons/io5";
import {FaRegUser} from "react-icons/fa";
import {TiPhoneOutline} from "react-icons/ti";
import {motion, AnimatePresence} from "framer-motion"
import {menuItems, icons} from "@/utils/Users";
import dynamic from 'next/dynamic';
import {useGetProductsQuery} from "@/redux/features/api/apiSlice";

const CartIcon = dynamic(() => import("@/components/client/module/CartIcon"), {ssr: false});


function Header() {
    const [darkMode, setDarkMode] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [search, setSearch] = useState("")
    const [filteredSearch, setFilteredSearch] = useState([]);


    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark");
    };

    const handleConfirm = () => {
        if (search.trim()) {
            setIsConfirmed(true);
            const filtered = data?.data?.filter(item =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredSearch(filtered || []);
        }
    };


    const {data, error, isLoading} = useGetProductsQuery();


    const filteredProducts = data?.data?.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <header>
            {/* دسکتاپ */}
            <div className="container relative z-10 mt-2 mx-auto hidden md:flex flex-col items-end">
                <div className="w-full flex justify-between items-center">
                    {/* لوگو و منو */}
                    <div className="flex items-center justify-between">
                        <div className=" relative top-3">
                            <Link href="/" className="w-20 ">
                                <Image src="/image/Group 946.svg" alt="Logo" width={90} height={90}/>
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
                                <Image src="/image/Sun.svg" alt="Light Mode" width={24} height={24}/>
                            )}
                        </button>
                        <Link href="/Login_Registration">
                            <div
                                className="bg-white dark:bg-gray-800 shadow-lg p-3 rounded-full flex items-center justify-center w-12 h-12">
                                <FaRegUser color={!darkMode ? "black" : "white"}/>
                            </div>
                        </Link>
                        <Link href="/Shopping_Cart" className="relative">
                            <div
                                className="bg-white dark:bg-gray-800 shadow-lg p-3 rounded-full flex items-center justify-center w-12 h-12">
                                <IoBagOutline color={!darkMode ? "black" : "white"}/>
                            </div>
                            <CartIcon/>
                        </Link>


                    </div>
                </div>

                {/* نوار جستجو */}
                <div
                    className="flex border border-gray-300  dark:bg-gray-800 dark:border border-gray-400  mt-5 bg-slate-50 p-2 rounded w-[350px] items-center">
                    <Image src="/image/Search-01.svg" alt="Search Icon" width={20} height={20}/>
                    <input name="Search" value={search} onChange={(e) => setSearch(e.target.value)} type="text"
                           className=" dark:bg-gray-800 dark:text-white w-full outline-none text-black pr-2"
                           placeholder="جستجو کنید..."/>
                </div>
                {search.trim() !== '' && filteredProducts.length > 0 && (
                    <div
                        className="hidden md:block absolute top-36 mt-2 w-[350px] max-h-[400px] overflow-y-auto bg-white rounded-xl shadow-xl border border-gray-200 z-50 space-y-2 p-3">
                        {filteredProducts.map((item) => (
                            <Link
                                onClick={() => setSearch('')}
                                href={`/Products/${item.id}/${encodeURIComponent(item.name)}`}
                                key={item.id}
                                className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 rounded-lg p-2 transition-all cursor-pointer"
                            >
                                <Image
                                    src={item.featured_image}
                                    alt={item.name}
                                    width={50} height={50}
                                    className=" object-cover rounded-md border border-gray-300"
                                />
                                <p className="text-sm text-gray-800 line-clamp-2">{item.name}</p>
                            </Link>
                        ))}
                    </div>
                )}


            </div>


            {/* موبایل */}
            <div className="container relative z-10 mt-2 mx-auto flex justify-between md:hidden items-center px-4">
                {/* دکمه‌ی منو */}


                {/* لوگو */}
                <Link href="/" className="w-16">
                    <Image src="/image/Group 946.svg" alt="Logo" width={80} height={80}/>
                </Link>

                {/* آیکون‌ها */}
                <div className="flex space-x-3 rtl:space-x-reverse">
                    <button
                        onClick={toggleDarkMode}
                        className={`${!darkMode ? 'bg-white' : 'dark:bg-gray-800'}  shadow-lg p-3 rounded-full flex items-center justify-center w-12 h-12`}
                    >
                        {darkMode ? (
                            <MdOutlineDarkMode color={!darkMode ? "black" : "white"}/>
                        ) : (
                            <Image src="/image/Sun.svg" alt="Light Mode" width={24} height={24}/>
                        )}
                    </button>
                    <button onClick={() => setIsOpen(true)}
                            className="bg-slate-50 p-3 rounded-full w-12 h-12 flex items-center justify-center"
                            href="/">
                        <Image src="/image/Search-01.svg" alt="Search Icon" width={24} height={24}/>
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{scale: 0.8, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.8, opacity: 0}}
                            transition={{duration: 0.3}}
                            className="bg-white p-6 rounded-2xl w-[90%] max-w-md shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <input
                                type="text"
                                placeholder="جستجو..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setIsConfirmed(false);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleConfirm();
                                }}
                                className="text-black w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />


                            {search.trim() && !isConfirmed && (
                                <button
                                    onClick={handleConfirm}
                                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-xl w-full"
                                >
                                    تایید
                                </button>
                            )}


                            {isConfirmed && (
                                <>
                                    <div className="mt-6 p-4 border rounded-xl bg-gray-100 text-black">
                                        <h3 className="font-bold text-lg mb-2">نتیجه جستجو:</h3>
                                        <p>🔍 محصولی با عنوان: {search}</p>
                                    </div>

                                    {search.trim() !== '' && filteredSearch.length > 0 && (
                                        <div
                                            className=" block md:hidden  mt-2 w-[280px] max-h-[400px] overflow-y-auto bg-white rounded-xl shadow-xl border border-gray-200 z-50 space-y-2 p-3">
                                            {filteredSearch.map((item) => (
                                                <Link
                                                    key={item.id}
                                                    href={`/Products/${item.id}/${encodeURIComponent(item.name)}`}
                                                    onClick={() => {
                                                        setSearch('');
                                                        setIsOpen(false); // ✅ بسته شدن مودال هنگام کلیک روی نتیجه
                                                        setIsConfirmed(false);
                                                    }}
                                                    className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 rounded-lg p-2 transition-all cursor-pointer"
                                                >
                                                    <Image
                                                        src={item.featured_image}
                                                        alt={item.name}
                                                        width={50}
                                                        height={50}
                                                        className="object-cover rounded-md border border-gray-300"
                                                    />
                                                    <p className="text-sm text-gray-800 line-clamp-2">{item.name}</p>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>


                            )}

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Header;
