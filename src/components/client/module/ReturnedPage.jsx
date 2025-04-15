import React from 'react';
import {FaCheckCircle} from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { IoIosInformationCircle } from "react-icons/io";


import Image from "next/image";

function ReturnedPage(props) {
    return (
        <>
            <div className="hidden md:flex items-center justify-between flex-col">
                <div className=" flex items-center justify-between w-[735px] h-[138px] border border-slate-300 p-5 rounded-2xl">
                    <div className="flex items-start justify-between flex-col">
                        <div className="flex items-center justify-start">
                            <div className="text-red-700">
                                <IoCloseCircle />
                            </div>
                            <span className="text-[#CACACA] text-[16px] mr-2 font-medium">درخواست مرجوعی لغو شد.</span>

                        </div>
                        <div className="flex items-center justify-between mt-5">
                            <span className="text-[#626262]">17بهمن 1403</span>
                            <div className="flex items-center mr-10">
                                <span className="text-[#626262]">کدسفارش:</span>
                                <p className="text-black mr-2 font-normal">441620023</p>
                            </div>
                            <div className="flex items-center mr-10">
                                <span className="text-red-700"><IoIosInformationCircle /></span>
                                <p className=" text-[14px] text-red-700 mr-2 font-normal"> ایرادات فنی کالا </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Image
                            className="rounded-xl"
                            src="/images1235.png"
                            alt="image"
                            width={50}
                            height={50}
                        />
                    </div>
                </div>
                <div className=" flex items-center mt-5 justify-between w-[735px] h-[138px] border border-slate-300 p-5 rounded-2xl">
                    <div className="flex items-start justify-between flex-col">
                        <div className="flex items-center justify-start">
                            <div className="text-green-500">
                                <FaCheckCircle/>
                            </div>
                            <span className="text-black text-[16px] mr-2 font-medium">کالا ها دریافت شدند</span>

                        </div>
                        <div className="flex items-center justify-between mt-5">
                            <span className="text-[#626262]">17بهمن 1403</span>
                            <div className="flex items-center mr-10">
                                <span className="text-[#626262]">کدسفارش:</span>
                                <p className="text-black mr-2 font-normal">441620023</p>
                            </div>
                            <div className="flex items-center mr-10">
                                <span className="text-[#626262]">مبلغ:</span>
                                <p className="text-black mr-2 font-normal"> 6.500.000 تومان </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Image
                            className="rounded-xl"
                            src="/images1235.png"
                            alt="image"
                            width={50}
                            height={50}
                        />
                    </div>
                </div>
            </div>

            <div className="flex md:hidden items-center justify-between flex-col">
                <div className=" flex items-start flex-col justify-between w-[312px] h-[142px] border border-slate-300 p-5 rounded-2xl">
                    <div className="flex">
                        <span className="text-[#626262] text-[12px]">17بهمن 1403</span>
                    </div>
                    <div className="flex">
                        <div>
                            <Image
                                className="rounded-xl"
                                src="/images1235.png"
                                alt="image"
                                width={50}
                                height={50}
                            />
                        </div>
                        <div className="mr-2">
                            <div className="flex items-center justify-start">
                                <div className="text-red-700">
                                    <IoCloseCircle />
                                </div>
                                <span className="text-[#CACACA] text-[14px] mr-2 font-medium">درخواست مرجوعی لغو شد.</span>
                            </div>
                            <div className="flex items-center mt-2">
                                <span className="text-red-700"><IoIosInformationCircle /></span>
                                <p className=" text-[14px] text-red-700 mr-2 font-normal"> ایرادات فنی کالا </p>
                            </div>
                            <div className="flex items-center mt-2">
                                <span className="text-[#626262] text-[12px]">مبلغ:</span>
                                <p className="text-black mr-2 font-normal text-[12px]"> 6.500.000 تومان </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" flex items-start flex-col mt-2 justify-between w-[312px] h-[142px] border border-slate-300 p-5 rounded-2xl">
                    <div className="flex">
                        <span className="text-[#626262] text-[12px]">17بهمن 1403</span>
                    </div>
                    <div className="flex">
                        <div>
                            <Image
                                className="rounded-xl"
                                src="/images1235.png"
                                alt="image"
                                width={50}
                                height={50}
                            />
                        </div>
                        <div className="mr-2">
                            <div className="flex items-center justify-start">
                                <div className="text-green-500">
                                    <FaCheckCircle/>
                                </div>
                                <span className="text-black text-[14px] mr-2 font-medium">کالا ها دریافت شدند </span>
                            </div>
                            <div className="flex items-center mt-2">
                                <span className="text-[#626262] text-[12px]">کدسفارش:</span>
                                <p className="text-black mr-2 font-normal text-[12px]">441620023</p>
                            </div>
                            <div className="flex items-center mt-2">
                                <span className="text-[#626262] text-[12px]">مبلغ:</span>
                                <p className="text-black mr-2 font-normal text-[12px]"> 6.500.000 تومان </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ReturnedPage;