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
    const [isClient, setIsClient] = useState(false); // برای اطمینان از اجرای کد در کلاینت
    console.log(state)
    const dispatch = useDispatch();


    useEffect(() => {
        setIsClient(true); // فقط در کلاینت این مقدار تغییر می‌کند
    }, []);

    if (!isClient) {
        return null; // زمانی که صفحه هنوز در حال رندر در سرور است، چیزی نمایش داده نمی‌شود
    }

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
                            {state.selectedItems?.map((item) => <CardShopping key={item.id} item={item}/>)}
                        </div>
                    </div>
                </div>
                <div className="md:w-[360px] h-auto rounded mt-14 border border-slate-400 m-auto">
                    <div className="border-b border-slate-400 flex flex-col items-center justify-center ">
                        <span
                            className="text-black m-auto text-center flex items-center justify-center mt-3 mb-5 font-bold">تعداد</span>
                        {state.selectedItems?.map((item) => <CardPriceShopping key={item.id} item={item}/>)}
                    </div>
                    <div className="mt-5 flex justify-around items-center">
                        <span className="text-[#626262] ml-16">جمع سبد خرید:</span>
                        <div className="flex justify-between items-center">
                            <p className="text-red-600 font-bold">{ConvertCurrency(state.total)}</p>
                            <span className="text-black mr-2">تومان</span>
                        </div>
                    </div>
                    <div
                        className="w-[312px] h-[42px] bg-[#3083FF] m-auto flex items-center justify-center mt-10 mb-5 rounded"
                        onClick={handleOrder}>
                        <button>ثبت سفارش</button>
                    </div>
                </div>
            </div>

            {/*mobile*/}
            <div className="flex md:hidden flex-col">
                <div>
                    {state.selectedItems?.map((item) => <CardShopping key={item.id} item={item}/>)}
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
                            <p className="text-red-600 font-bold text-[14px]">{ConvertCurrency(state.total)}</p>
                            <span className="text-black mr-2">تومان</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-10 border-t border-slate-400 w-[360px] p-5">
                        <div
                            className="flex items-center justify-center rounded w-[131px] h-[40px] bg-[#3083FF] cursor-pointer" onClick={handleOrder}>
                            <button>ثبت سفارش</button>
                        </div>
                        <div>
                            <span className="text-[12px] text-[#626262]">جمع سبد خرید</span>
                            <div className="flex justify-start items-start">
                                <p className="text-red-600 font-bold text-[14px]">{ConvertCurrency(state.total)}</p>
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