"use client"
import React from 'react';
import {RiShoppingCartFill} from "react-icons/ri";
import {FaTruckFast} from "react-icons/fa6";
import {TbShoppingBagCheck} from "react-icons/tb";
import {FaAngleRight} from "react-icons/fa6";
import {useDispatch, useSelector} from "react-redux";
import {setStep} from "@/redux/features/step/stepSlice";

function Layout({children}) {
    const step = useSelector((state) => state.step.step);
    console.log(step)
    const dispatch = useDispatch()
    const handleOrder = () => {

        dispatch(setStep(1))
    }
    return (
        <>
            {/*Desktop*/}
            <div
                className="hidden container m-auto md:flex items-center justify-center mt-10 w-[500px] pb-8 border-b border-[#D9D9D9]">
                <div className="flex items-center justify-center">
                    <div
                        className={`${step >= 1 ? "text-[#3083FF]" : "text-[#626262]"} flex items-center  justify-between flex-col cursor-pointer`}
                        onClick={handleOrder}>
                        <RiShoppingCartFill size="30"/>
                        <span className="text-[16px] mt-2">بررسی سبد خرید</span>
                    </div>
                    <span
                        className={`w-[90px] h-[1px] ${step >= 2 ? "bg-[#3083FF]" : "bg-[#CACACA]"} mr-2 mb-5`}></span>
                </div>
                <div className="flex items-center justify-center">
                    <div
                        className={`${step >= 2 ? "text-[#3083FF]" : "text-[#626262]"} flex items-center justify-between flex-col`}>
                        <FaTruckFast size="30"/>
                        <span className="text-[16px] mt-2">اطلاعات ارسال</span>
                    </div>
                    <span
                        className={`w-[90px] h-[1px] ${step >= 3 ? "bg-[#3083FF]" : "bg-[#CACACA]"} mr-2 mb-5`}></span>
                </div>
                <div className="flex items-center justify-center">
                    <div
                        className={`${step >= 3 ? "text-[#3083FF]" : "text-[#626262]"} flex items-center justify-between flex-col`}>
                        <TbShoppingBagCheck size="30"/>
                        <span className="text-[16px] mt-2">پایان خرید</span>
                    </div>

                </div>
            </div>

            {/*Mobile*/}
            <div
                className="container m-auto w-[312px]  items-center justify-between flex md:hidden mt-2 border-b border-slate-300 pb-5">
                <div className="text-black">
                    <FaAngleRight/>
                </div>
                <div>
                    <span className="text-black text-[16px] text-center m-auto">
                          {step === 1 ? "بررسی سبد خرید" : step === 2 ? "اطلاعات ارسال" : "پایان خرید"}

                    </span>
                </div>
                <div className="text-black flex text-[10px] mt-2">
                    <span>مرحله</span>
                    <p>{step} از 3</p>
                </div>
            </div>


            <div>{children}</div>
        </>
    );
}

export default Layout;