"use client"
import React, {useEffect, useState} from 'react';
import {ConvertCurrency} from "@/helper/text";
import {useDispatch, useSelector} from "react-redux";
import CardShopping from "@/components/client/module/CardShopping";
import CardPriceShopping from "@/components/client/module/CardPriceShopping";
import {setStep} from "@/redux/features/step/stepSlice";
import {toast, Toaster} from "sonner";

function ShoppingCard() {
    const state = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    console.log(state)



    const handleOrder = () => {
        if (state.selectedItems?.length === 0) {
            toast.warning("لطفاً ابتدا خرید کنید! 🛒", {
                position: "top-center",
                duration: 3000
            });
            return;
        }

        dispatch(setStep(2))
    };

    return (
        <>
            <Toaster expand={true} position="top-center" richColors/>

            {/*Desktop*/}
            <div className="hidden m-auto container md:flex items-center justify-center mt-28">
                <div className="flex flex-col">
                    <div className="md:w-[816px]">
                        <div className="flex items-center justify-between">
                            <span className="text-black mr-8">محصول</span>
                            <div className="flex items-center ml-10">
                                <span className="text-black ml-40">جمع قیمت</span>
                                <span className="text-black ">تعداد</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            {state.selectedItems.map((item) => <CardShopping key={item.id} item={item}/>)}
                        </div>
                    </div>
                </div>
                <div className="md:w-[360px] w-[90%] mx-auto bg-white rounded-2xl mt-14 border border-slate-300 shadow-lg">
                    {/* هدر */}
                    <div className="border-b border-slate-200 px-6 pt-5 pb-3">
                        <h2 className="text-center text-lg font-extrabold text-gray-800">تعداد</h2>
                    </div>

                    {/* لیست محصولات */}
                    <div className="px-4 py-4 space-y-3">
                        {state.selectedItems.map((item) => (
                            <CardPriceShopping key={item.id} item={item} />
                        ))}
                    </div>

                    {/* جمع کل */}
                    <div className="px-6 pt-4 pb-3 border-t border-slate-200 flex justify-between items-center text-gray-700 text-sm">
                        <span className="font-medium">جمع سبد خرید:</span>
                        <div className="flex items-center text-red-600 font-bold text-base">
                            <span>{Number(state.total).toLocaleString("fa-IR")}</span>
                            <span className="mr-1 text-black text-sm font-normal">تومان</span>
                        </div>
                    </div>

                    {/* دکمه ثبت سفارش */}
                    <div className="px-6 pb-6">
                        <button
                            onClick={handleOrder}
                            className="w-full h-[44px] bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold rounded-xl shadow-sm"
                        >
                            ثبت سفارش
                        </button>
                    </div>
                </div>
            </div>

            {/*mobile*/}
            <div className="flex md:hidden flex-col">
                <div>
                    {state.selectedItems.map((item) => <CardShopping key={item.id} item={item}/>)}
                </div>

            </div>

            <div className="flex flex-col items-center ">
                <div className="flex flex-col md:hidden flex items-center justify-between">
                <span
                    className="text-black text-sm m-auto text-center flex items-center justify-center mt-3 mb-5 font-bold">تعداد</span>
                    {state.selectedItems?.map((item) => <CardPriceShopping key={item.id} item={item}/>)}
                </div>
                <div className="flex flex-col md:hidden items-center ">
                    <div
                        className="w-[312px] mt-5 flex justify-between items-center m-auto border-t border-gray-400 pt-5">
                        <span className="text-[#626262] ml-16 text-[14px]">جمع سبد خرید:</span>
                        <div className="flex justify-between items-center">
                            <p className="text-red-600 font-bold text-[14px]">{Number(state.total).toLocaleString("fa-IR")}</p>
                            <span className="text-black mr-2">تومان</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-10 border-t border-slate-400 w-[360px] p-5">
                        <div
                            className="flex items-center justify-center rounded w-[131px] h-[40px] bg-[#3083FF] cursor-pointer"
                            onClick={handleOrder}>
                            <button>ثبت سفارش</button>
                        </div>
                        <div>
                            <span className="text-[12px] text-[#626262]">جمع سبد خرید</span>
                            <div className="flex justify-start items-start">
                                <p className="text-red-600 font-bold text-[14px]">{Number(state.total).toLocaleString("fa-IR")}</p>
                                <span className="text-black mr-2 text-[14px]">تومان</span>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ShoppingCard;