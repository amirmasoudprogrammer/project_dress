import React, {useState} from 'react';
import Image from "next/image";
import {IoIosHeart} from "react-icons/io";

import Link from "next/link";
import {FaBookmark} from "react-icons/fa";
import {ConvertCurrency, Text} from "@/helper/text";
import {useDispatch, useSelector} from "react-redux";
import {addToFavorites, addToSavedItems} from "@/redux/features/Cart/cartSlice";


function CardProduct({data, off}) {
    const {id, title, image, price} = data;
    const dispatch = useDispatch();
    const state = useSelector((store) => store.cart);
    console.log(state)
    const [colorHeart, setColorHeart] = useState(false);
    const [colorShop, setColorShop] = useState(false);
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
        <div className="flex flex-col mt-5">
            <div className="flex flex-col items-center w-auto justify-center border border-slate-300">
                <div className="relative flex flex-col items-center">
                    <div className="absolute top-0 right-0 mr-4 mt-4 cursor-pointer">
                        <IoIosHeart
                            onClick={toggleFavorite}
                            color={state.favorites?.find(item => item.id === id) ? "red" : "black"}
                            size={24}
                        />
                    </div>
                    {off && (
                        <div className="absolute top-[-4px] left-2">
                            <Image src="/Group 4.png" alt="icon" width={44} height={44}/>
                        </div>
                    )}
                    <Image src={image || "/Rectangle 150.png"} alt={title || "محصول بدون نام"} width={288}
                           height={288}/>
                    <div className="absolute bottom-5 left-5 flex items-center justify-between w-[140px]">
                        <Link href={`/Products/${id}`}
                              className="shadow-lg text-2xl text-black bg-slate-200 w-7 h-7 flex items-center justify-center p-2 rounded-full">+</Link>
                    </div>
                </div>
            </div>
            <div className="w-full h-[113px] flex flex-col items-start border border-slate-300 p-4">
                <div className="flex items-center justify-between ">
                    <div className="cursor-pointer" onClick={toggleSave}>
                        <FaBookmark size={20} color={colorBookmark ? "red" : "black"} className="mr-3"/>
                    </div>
                    <span className="text-black dark:text-white mr-5 truncate">{Text("سسس")}</span>
                </div>
                <span className="mt-3 text-sm text-red-500 dark:text-green-700">
                    {ConvertCurrency(price)} <strong className="text-black dark:text-white">تومان</strong>
                </span>
            </div>
        </div>
    );
}

export default CardProduct;
