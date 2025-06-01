"use client";
import React from "react";
import Image from "next/image";
import {decrease, increase, RemoveITEM} from "@/redux/features/Cart/cartSlice";
import {MdDelete} from "react-icons/md";
import {useDispatch} from "react-redux";
import PriceClient from "@/components/client/module/PriceClient";

function CardShopping({item}) {
    const dispatch = useDispatch();

    return (
        <>
            {/* دسکتاپ */}
            <div className="hidden md:flex items-center rounded-xl bg-white shadow-md p-6 mt-7 border border-gray-300">
                <div className="flex items-center justify-center w-[90px] h-[90px] rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <Image
                        className="rounded-lg"
                        src={item.image}
                        alt="عکس"
                        width={90}
                        height={90}
                        priority
                    />
                </div>

                <div className="flex flex-col justify-center mr-8 flex-1 text-gray-800">
                    <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
                    <div className="flex space-x-8 text-gray-600 text-sm">
                        <div>
                            <span className="font-semibold">سایز:</span> {item.size}
                        </div>
                        <div>
                            <span className="font-semibold">رنگ:</span> {item.color}
                        </div>
                    </div>
                </div>

                <div className="text-orange-500 font-extrabold  text-lg ml-10 whitespace-nowrap">
                    <PriceClient value={item.price}/>
                </div>

                <div
                    className="flex items-center bg-gray-100 rounded-lg w-[110px] h-[46px] mr-10 justify-between px-4 shadow-inner border border-gray-300">
                    <button
                        className="text-orange-500 text-2xl font-bold hover:text-orange-600 transition-colors duration-300"
                        onClick={() =>
                            dispatch(
                                increase({
                                    id: item.id,
                                    color: item.color ?? "",
                                    size: item.size ?? "",
                                })
                            )
                        }
                    >
                        +
                    </button>

                    <span className="text-gray-900 font-semibold text-lg">{item.quantity}</span>

                    {item.quantity > 1 ? (
                        <button
                            className="text-orange-500 text-2xl font-bold hover:text-red-500 transition-colors duration-300"
                            onClick={() =>
                                dispatch(
                                    decrease({
                                        id: item.id,
                                        color: item.color ?? "",
                                        size: item.size ?? "",
                                    })
                                )
                            }
                        >
                            -
                        </button>
                    ) : (
                        <button
                            className="text-red-500 hover:text-red-700 transition-colors duration-300"
                            onClick={() =>
                                dispatch(
                                    RemoveITEM({
                                        id: item.id,
                                        color: item.color,
                                        size: item.size,
                                    })
                                )
                            }
                        >
                            <MdDelete size={22}/>
                        </button>
                    )}
                </div>
            </div>

            {/* موبایل */}
            <div className="md:hidden rounded-2xl bg-white shadow-md mt-7 w-[320px] mx-auto p-6 border border-gray-300">
                <div className="flex border-b border-gray-300 pb-5">
                    <div className="w-[90px] h-[90px] rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                        <Image
                            className="rounded-lg"
                            src={item.image}
                            alt="عکس"
                            width={90}
                            height={90}
                            priority
                        />
                    </div>
                    <div className="mr-6 flex flex-col justify-center flex-1 text-gray-800">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <div className="flex space-x-4 mt-1 text-gray-600 text-sm">
                            <div>
                                <span className="font-semibold">سایز:</span> {item.size}
                            </div>
                            <div>
                                <span className="font-semibold">رنگ:</span> {item.color}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <div className="flex justify-between items-center text-gray-600 text-sm mb-4">
                        <span>جمع قیمت:</span>
                        <span className="font-bold text-orange-500"><PriceClient value={item.price}/></span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">تعداد:</span>
                        <div
                            className="border border-gray-300 rounded-lg w-[80px] flex items-center justify-around h-[36px] shadow-inner bg-gray-100">
                            <button
                                className="text-orange-500 text-xl font-bold hover:text-orange-600 transition-colors duration-300"
                                onClick={() =>
                                    dispatch(
                                        increase({
                                            id: item.id,
                                            color: item.color ?? "",
                                            size: item.size ?? "",
                                        })
                                    )
                                }
                            >
                                +
                            </button>

                            <span className="text-gray-900 font-semibold text-lg">{item.quantity}</span>

                            {item.quantity > 1 ? (
                                <button
                                    className="text-orange-500 text-xl font-bold hover:text-red-500 transition-colors duration-300"
                                    onClick={() =>
                                        dispatch(
                                            decrease({
                                                id: item.id,
                                                color: item.color ?? "",
                                                size: item.size ?? "",
                                            })
                                        )
                                    }
                                >
                                    -
                                </button>
                            ) : (
                                <button
                                    className="text-red-500 hover:text-red-700 transition-colors duration-300"
                                    onClick={() =>
                                        dispatch(
                                            RemoveITEM({
                                                id: item.id,
                                                color: item.color,
                                                size: item.size,
                                            })
                                        )
                                    }
                                >
                                    <MdDelete size={20}/>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardShopping;
