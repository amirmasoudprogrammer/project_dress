import React, {useState} from 'react';
import Image from "next/image";
import {IoIosHeart} from "react-icons/io";

import Link from "next/link";
import {FaBookmark} from "react-icons/fa";
import {ConvertCurrency, Text} from "@/helper/text";
import {useDispatch, useSelector} from "react-redux";
import {addToFavorites, addToSavedItems} from "@/redux/features/Cart/cartSlice";


function CardProduct({data, off}) {
    const {id, name, price ,slug} = data;
    const dispatch = useDispatch();
    const state = useSelector((store) => store.cart);

    const [colorHeart, setColorHeart] = useState(false);
    const [colorBookmark, setColorBookmark] = useState(false);


    const toggleFavorite = () => {
        dispatch(addToFavorites(data))
        setColorHeart(!colorHeart)
    }

    const toggleSave = () => {
        dispatch(addToSavedItems(data))
        setColorBookmark(!colorBookmark)
    }


    return (
        <div className="flex flex-col mt-5 ">
            <div className="flex flex-col items-center w-full justify-center  rounded overflow-hidden">
                <div className="relative w-full h-[300px] bg-white">
                    {/* آیکون قلب */}
                    <div className="absolute top-5 right-10 z-10 cursor-pointer">
                        <IoIosHeart
                            onClick={toggleFavorite}
                            color={state.favorites?.find(item => item.id === id) ? "red" : "black"}
                            size={24}
                        />
                    </div>

                    {/* آیکون تخفیف */}
                    {off && (
                        <div className="absolute top-2 left-2 z-10">
                            <Image src="/image/Group 4.png" alt="icon" width={44} height={44} />
                        </div>
                    )}

                    {/* عکس محصول */}
                    <Image
                        src={data.featured_image}
                        alt={name || "محصول بدون نام"}
                        fill
                        className="object-cover flex items-center justify-center rounded w-full h-full"
                    />

                    {/* دکمه + وسط عکس */}
                    <div className="absolute left-0 right-0 mb-3 bottom-0 flex items-center justify-center z-10">
                        <Link href={`/Products/${id}/${slug}`}>
                            <div className="bg-white text-black text-xl w-10 h-10 flex items-center justify-center rounded-full shadow hover:scale-105 transition-all">
                                +
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="w-full h-[113px] flex flex-col justify-between border border-slate-300 rounded-b-lg px-4 py-3 bg-white dark:bg-slate-800">
                <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-gray-800 dark:text-gray-100 truncate w-[80%]">
            {name}
        </span>
                    <button
                        onClick={toggleSave}
                        className="transition-transform duration-200 hover:scale-110"
                        aria-label="ذخیره محصول"
                    >
                        <FaBookmark
                            size={20}
                            color={state.savedItems?.find(item => item.id === id) ? "#ef4444" : "#64748b"}
                        />
                    </button>
                </div>

                <div className="mt-2 flex items-center justify-between">
        <span className="text-lg font-bold text-rose-600 dark:text-green-500">
            {ConvertCurrency(price)} <span className="text-sm text-gray-600 dark:text-gray-300">تومان</span>
        </span>
                </div>
            </div>
        </div>
    );
}

export default CardProduct;
