"use client"
import React from 'react';
import Image from "next/image";
import {ConvertCurrency, Text} from "@/helper/text";
import {decrease, increase, RemoveITEM} from "@/redux/features/Cart/cartSlice";
import {MdDelete} from "react-icons/md";
import {useDispatch} from "react-redux";


function CardShopping({item}) {
    const dispatch = useDispatch();
    console.log(item.data.product)
    return (
        <>
            <div className="hidden md:flex items-center rounded border border-slate-400 h-[132px] p-5 mt-5">
                <div className="flex items-center justify-center ">
                    <Image className="rounded" src={item.data.product.featured_image}
                           alt="Logo"
                           width={60}
                           height={60}/>

                </div>
                <div className="flex flex-col items-center justify-center mr-5 ">
                    <span className="text-[#626262] text-[14px] mr-5 mb-5">{}</span>
                    <div className="flex items-center">
                        <div className="text-sm text-[#626262] flex items-center mr-5">
                            <span>{item.size}</span>

                        </div>
                        <div className="text-sm text-[#626262] flex items-center mr-5">
                            <span>رنگ</span>
                            :
                            <p>{item.colors}</p>
                        </div>
                    </div>
                </div>
                <div className="text-sm flex text-[#626262] items-center mr-auto">
                    <span className="ml-2">  {Number(item.data.product.price).toLocaleString("fa-IR")}</span>
                    <span>تومان</span>

                </div>
                <div
                    className="flex justify-around rounded w-[87px] h-[42px] items-center mr-auto border border-slate-400">
                    <button className="text-black" type="submit"
                            onClick={() => dispatch(increase({
                                id: item.id,
                                color: item.colors ?? '',
                                size: item.size ?? ''
                            }))}>
                        +
                    </button>

                    <span className="text-black">
                                            {item.quantity}
                                         </span>

                    {item.quantity > 1 ? (
                        <button className="text-black" type="submit"
                                onClick={() => dispatch(decrease({
                                    id: item.id,
                                    color: item.colors ?? '',
                                    size: item.size ?? ''
                                }))}>
                            -
                        </button>
                    ) : <button className="text-red-500" onClick={() => dispatch(RemoveITEM({
                        id: item.id,
                        color: item.colors,
                        size: item.size
                    }))}>
                        <MdDelete/>
                    </button>}

                </div>
            </div>

            <div
                className=" flex flex-col md:hidden rounded-lg border border-slate-200 mt-5 w-[312px] h-[225px] m-auto pt-5 pr-5 pl-5">
                <div className="flex border-b border-slate-200 pb-5 ">
                    <div>
                        <Image className="rounded" src="/image/1bac492818e7c2d5b8ac0ea324830989.jpg"
                               alt="Logo"
                               width={60}
                               height={60}/>

                    </div>
                    <div className="mr-5">
                        <span className="text-[#626262] text-[13px] ">پیراهن ماکسی سوفیا</span>
                        <div>
                            <div className="mt-2">
                                <span className="text-[#626262] text-[13px]">{item.size}</span>
                                <div className="text-sm text-[#626262] flex items-center mt-2">
                                    <span>رنگ</span>
                                    :
                                    <p>{item.colors}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-[#626262] text-[12px]">جمع قیمت:</span>
                        <p className="text-[#626262] text-[12px]">{ConvertCurrency(item.price)}تومان</p>
                    </div>
                    <div className=" flex justify-between mt-5">
                        <span className="text-[#626262] text-[12px]">تعداد:</span>
                        <div
                            className="border border-slate-400 w-[63px] flex items-center rounded justify-around h-[26px]">
                            <button className="text-black" type="submit"
                                    onClick={() => dispatch(increase({
                                        id: item.id,
                                        color: item.colors ?? '',
                                        size: item.size ?? ''
                                    }))}>
                                +
                            </button>

                            <span className="text-black text-[12px] text-center">
                                            {item.quantity}
                                         </span>

                            {item.quantity > 1 ? (
                                <button className="text-black" type="submit"
                                        onClick={() => dispatch(decrease({
                                            id: item.id,
                                            color: item.colors ?? '',
                                            size: item.size ?? ''
                                        }))}>
                                    -
                                </button>
                            ) : <button className="text-red-500" onClick={() => dispatch(RemoveITEM({
                                id: item.id,
                                color: item.colors,
                                size: item.size
                            }))}>
                                <MdDelete/>
                            </button>}
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default CardShopping;