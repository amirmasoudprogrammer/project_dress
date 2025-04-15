"use client"
import React, {useState} from 'react';
import {FaArrowRightLong} from "react-icons/fa6";
import Image from "next/image";
import {ConvertCurrency} from "@/helper/text";
import { MdDelete } from "react-icons/md";
import { CiShoppingCart } from "react-icons/ci";
import Link from "next/link";
import {useDispatch} from "react-redux";
import {addToFavorites} from "@/redux/features/Cart/cartSlice";
import { motion, AnimatePresence } from "framer-motion";


function FavoritesPage({data}) {
    const [isVisible, setIsVisible] = useState(true);
    const [favoritesList, setFavoritesList] = useState(data);
    const [showPopup, setShowPopup] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const dispatch = useDispatch();


    const handleRemoveClick = (item) => {
        setItemToDelete(item);
        setShowPopup(true);
    };

    const handleRemoveFavorite = (item) => {
        const updatedList = favoritesList.filter(fav => fav.id !== itemToDelete.id);
        setFavoritesList(updatedList);
        dispatch(addToFavorites(itemToDelete));
        setShowPopup(false);
        setItemToDelete(null);
    };

    const cancelDelete = () => {
        setShowPopup(false);
        setItemToDelete(null);
    };

    console.log({favoritesList})


    const handleExit = () => {
        setIsVisible(false);
    };
    return (
        <>
            <div className="hidden md:flex flex-col items-start justify-between mt-10 mr-5">
                <div className="flex flex-col items-start justify-between">
                    <span className="text-black text-[12px]">علاقه مندی ها</span>
                    <p className="w-[50px] h-[2px] bg-red-500 mt-1"></p>
                </div>

                {favoritesList.map((item) => (
                    <div key={item.id} className="w-[831px] h-[298px] border border-slate-300 mt-10 rounded-xl shadow-lg">
                        <div className="w-[783px] h-[202px] mt-5 mr-5 flex items-end justify-between">
                            <div className="flex ">
                                <Image src={item.images[0]} className="rounded shadow-lg" alt="image" width={200}
                                       height={200}/>
                                <div className="flex flex-col mr-2 items-start center justify-center">
                                    <span className="mr-2 text-[14px] text-black">{item.title}</span>
                                </div>
                            </div>
                            <div  className="text-black">
                                <span   className="text-red-700 font-bold">{ConvertCurrency(item.price)}</span>
                                <span className="mr-2">تومان</span>
                            </div>
                        </div>
                        <div className="flex items-end justify-end mt-5 ml-5">
                            <button onClick={() => handleRemoveClick(item)} className="ml-5 w-[50px] h-[40px] text-slate-400 flex items-center justify-center rounded border border-slate-300">
                                <MdDelete />
                            </button>
                            <Link href={`/Products/${item.id}`} className="text-[20px] rounded border border-red-600 w-[252px] h-[40px] text-red-700 flex items-center justify-center">
                                <CiShoppingCart />
                                <span className="text-red-700 font-medium mr-2 text-[15px]">اضافه به سبد خرید</span>
                            </Link>
                        </div>
                    </div>
                ))}

                <AnimatePresence>
                    {showPopup && (
                        <motion.div
                            className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div className="bg-white rounded-xl flex flex-col justify-start p-6 w-[612px] h-[230px] shadow-xl" initial={{ scale: 0.8, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 50 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
                                <div className="mb-5">
                                    <span className="text-black">حذف از لیست</span>
                                </div>
                                <hr/>

                               <div className="mt-5">
                                   <p className="text-black text-[16px] font-medium mb-4 text-start">آیا مطمئنید که می‌خواهید این محصول را از لیست علاقه‌مندی‌ها حذف کنید؟</p>
                                   <div className="flex items-center justify-end mt-10">

                                       <button
                                           onClick={cancelDelete}
                                           className="border border-gray-400 text-gray-600 w-[79px] h-[37px] rounded hover:bg-gray-100 transition"
                                       >
                                           انصراف
                                       </button>
                                       <button
                                           onClick={handleRemoveFavorite}
                                           className="bg-red-600 text-white text-[12px] w-[79px] h-[37px] mr-3 rounded hover:bg-red-700 transition"
                                       >
                                           حذف کالا
                                       </button>
                                   </div>
                               </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {isVisible && (
                <div className="z-50 md:hidden flex flex-col absolute  w-full h-screen bg-white right-0 transition-transform duration-500 ease-in-out transform translate-x-0">
                <div className="mt-5 mr-5 flex items-center justify-start">
                    <button onClick={handleExit} className="text-black">
                        <FaArrowRightLong/>
                    </button>
                    <span className="text-black mr-5 text-[16px]">علاقه مندی ها</span>
                </div>

                    {favoritesList.map((item) => (
                        <div key={item.id} className="w-[312px] h-[173px] border border-slate-300 mt-10 rounded-xl shadow-lg mr-auto ml-auto ">
                            <div className="w-[290px] mt-5 mr-5 flex flex-col items-start justify-between">
                                <div className="flex ">
                                    <Image src={item.images[0]} className="rounded shadow-lg" alt="image" width={50}
                                           height={50}/>
                                    <div className="flex flex-col mr-2 items-start center justify-center">
                                        <span className="mr-2 text-[14px] text-black">{item.title}</span>
                                    </div>
                                </div>
                                <div  className="text-black flex items-end justify-end mr-44">
                                    <span className="text-red-700 font-bold text-[12px]">{ConvertCurrency(item.price)}</span>
                                    <span className="mr-2 text-[12px]">تومان</span>
                                </div>
                            </div>
                            <div className="flex items-end justify-end mt-5 ml-5">
                                <button onClick={() => handleRemoveClick(item)} className="ml-5 w-[50px] h-[40px] text-slate-400 flex items-center justify-center rounded border border-slate-300">
                                    <MdDelete />
                                </button>
                                <Link href={`/Products/${item.id}`} className=" rounded border border-red-600 w-[156px] h-[40px] text-red-700 flex items-center justify-center">
                                    <CiShoppingCart />
                                    <span className="text-red-700 font-medium mr-2 text-[12px]">اضافه به سبد خرید</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                    <AnimatePresence>
                        {showPopup && (
                            <motion.div
                                className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-40"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.div className="bg-white relative top-52 rounded-xl flex flex-col justify-start p-6 w-[612px] h-[230px] shadow-xl" initial={{ scale: 0.8, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 50 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
                                    <div className="mb-5">
                                        <span className="text-black">حذف از لیست</span>
                                    </div>
                                    <hr/>
                                    <div className="mt-5">
                                        <p className="text-black text-[12px] font-medium mb-4 text-start">آیا مطمئنید که می‌خواهید این محصول را از لیست علاقه‌مندی‌ها حذف کنید؟</p>
                                        <div className="flex items-center justify-end mt-5">

                                            <button
                                                onClick={cancelDelete}
                                                className="border border-gray-400 text-gray-600 w-[79px] h-[37px] rounded hover:bg-gray-100 transition"
                                            >
                                                انصراف
                                            </button>
                                            <button
                                                onClick={handleRemoveFavorite}
                                                className="bg-red-600 text-white text-[12px] w-[79px] h-[37px] mr-3 rounded hover:bg-red-700 transition"
                                            >
                                                حذف کالا
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}


        </>
    );
}

export default FavoritesPage;