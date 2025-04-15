import React from 'react';
import {IoIosClose} from "react-icons/io";
import {ConvertCurrency} from "@/helper/text";

function CardPriceShopping({item}) {
    return (
        <>
            <div
                className="hidden md:flex w-[300px] flex-col items-center justify-between w-auto m-auto pr-5 pl-10 pb-5">
                <div className=" flex text-[#626262] m-auto items-center w-auto justify-between">
                    <span className="ml-6 text-sm">پیراهن ماکسی سوفیا</span>
                    <div className="flex items-center ml-6">
                        <IoIosClose/>
                        <span>{item.quantity}</span>
                    </div>
                    <div className="flex">
                        <span className="text-sm">{ConvertCurrency(item.price)}</span>
                        <p className="mr-2 text-sm">تومان</p>
                    </div>
                </div>
            </div>

                <div className="flex md:hidden items-start justify-between w-[312px] mt-2">
                   <div className="flex items-center justify-start">
                       <span className="ml-6 text-sm text-[#626262]">پیراهن ماکسی سوفیا</span>
                   </div>
                    <div className="flex items-center justify-center ml-6 text-[#626262]">
                        <IoIosClose/>
                        <span>{item.quantity}</span>
                    </div>
                    <div className="flex text-[#626262]">
                        <span className="text-sm">{ConvertCurrency(item.price)}</span>
                        <p className="mr-2 text-sm">تومان</p>
                    </div>
                </div>

        </>
    );
}

export default CardPriceShopping;