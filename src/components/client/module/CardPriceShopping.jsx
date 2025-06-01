import React from 'react';
import { IoIosClose } from "react-icons/io";

function CardPriceShopping({ item }) {
    const price = Number(item.price).toLocaleString("fa-IR");

    return (
        <>
            {/* دسکتاپ */}
            <div className="hidden md:flex justify-between w-full max-w-[360px] flex-col m-auto bg-white  rounded-xl  px-6 py-4">
                <div className="flex items-center justify-between text-gray-700">
                    <span className="text-sm font-medium truncate max-w-[100px]">{item.name}</span>

                    <div className="flex items-center justify-center text-sm font-medium">
                        <IoIosClose className="text-lg text-gray-500" />
                        <span>{item.quantity}</span>
                    </div>

                    <div className="flex items-center text-sm font-semibold text-orange-500">
                        <span>{price}</span>
                        <span className="mr-1">تومان</span>
                    </div>
                </div>
            </div>

            {/* موبایل */}
            <div className="md:hidden w-[320px] mx-auto mt-3 bg-white border border-gray-200 rounded-2xl shadow-sm px-4 py-3">
                <div className="flex items-center justify-between text-gray-700">
                    <span className="text-sm font-medium truncate max-w-[100px]">{item.name}</span>

                    <div className="flex items-center text-sm font-medium">
                        <IoIosClose className="text-lg text-gray-500" />
                        <span>{item.quantity}</span>
                    </div>

                    <div className="flex items-center text-sm font-semibold text-orange-500">
                        <span>{price}</span>
                        <span className="mr-1">تومان</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardPriceShopping;
