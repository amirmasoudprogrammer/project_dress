"use client"
import React, { useState } from 'react';
import { MdLock } from "react-icons/md";
import { TbClockHour11 } from "react-icons/tb";
import { RiFileListFill } from "react-icons/ri";
import { VscCheck } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";

function OrdersPage(props) {
    const [status, setStatus] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [sort, setSort] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="mt-28 z-10">
            <div>
                <span className="text-black mr-8 text-[25px] font-bold">مدیرت سفارشات</span>
            </div>

            <div className='mt-5 flex items-center justify-between mr-8 ml-8'>
                <div className="flex items-center justify-center p-1 w-[200px] h-[70px] shadow-xl cursor-pointer border border-slate-200 rounded transition-all duration-500 hover:shadow-sm">
                    <div className="p-1 flex text-blue-500 text-[20px] bg-slate-300 rounded-full items-center justify-center w-[30px] h-[30px]">
                        <MdLock />
                    </div>
                    <span className="text-[12px] mr-2">کل سفارشات </span>
                </div>

                <div className="flex items-center justify-center p-1 w-[200px] h-[70px] shadow-xl cursor-pointer border border-slate-200 rounded transition-all duration-500 hover:shadow-sm">
                    <div className="p-1 flex text-orange-500 text-[20px] bg-yellow-300 rounded-full items-center justify-center w-[30px] h-[30px]">
                        <TbClockHour11 />
                    </div>
                    <span className="text-[12px] mr-2">در انتظار تایید</span>
                </div>

                <div className="flex items-center justify-center p-1 w-[200px] h-[70px] shadow-xl cursor-pointer border border-slate-200 rounded transition-all duration-500 hover:shadow-sm">
                    <div className="p-1 flex text-indigo-800 text-[20px] bg-indigo-400 rounded-full items-center justify-center w-[30px] h-[30px]">
                        <RiFileListFill />
                    </div>
                    <span className="text-[12px] mr-2">در حال پردازش</span>
                </div>

                <div className="flex items-center justify-center p-1 w-[200px] h-[70px] shadow-xl cursor-pointer border border-slate-200 rounded transition-all duration-500 hover:shadow-sm">
                    <div className="p-1 flex text-green-500 text-[20px] bg-green-200 rounded-full items-center justify-center w-[30px] h-[30px]">
                        <VscCheck />
                    </div>
                    <span className="text-[12px] mr-2">تکمیل شده</span>
                </div>

                <div className="flex items-center justify-center p-1 w-[200px] h-[70px] shadow-xl cursor-pointer border border-slate-200 rounded transition-all duration-500 hover:shadow-sm">
                    <div className="p-1 flex text-red-600 text-[20px] bg-red-200 rounded-full items-center justify-center w-[30px] h-[30px]">
                        <IoMdClose />
                    </div>
                    <span className="text-[12px] mr-2">لغو شده</span>
                </div>
            </div>

            <div className="mr-8 mt-5 flex items-start justify-start">
                {/* جستجو */}
                <div className="mt-2 flex rounded border border-slate-300 h-[30px] items-center justify-around">
                    <IoIosSearch />
                    <input
                        type="text"
                        className="outline-0 border-0 pr-2"
                        placeholder="جستجو محصول"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* فیلترها */}
                <form className="flex">
                    {/* وضعیت سفارش */}
                    <div className="flex flex-col mr-3">
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="text-slate-600 w-[220px] md:w-[170px] mt-2 h-[30px] outline-0 border border-slate-400 rounded"
                        >
                            <option value="">وضعیت سفارش</option>
                            <option value="درانتظار تایید">درانتظار تایید</option>
                            <option value="درحال پردازش">درحال پردازش</option>
                            <option value="در حال ارسال">در حال ارسال</option>
                            <option value="تکمیل شده">تکمیل شده</option>
                            <option value="لغو شده">لغو شده</option>
                        </select>
                    </div>

                    {/* نوع پرداخت */}
                    <div className="flex flex-col mr-3">
                        <select
                            name="paymentType"
                            value={paymentType}
                            onChange={(e) => setPaymentType(e.target.value)}
                            className="text-slate-600 w-[220px] md:w-[170px] mt-2 h-[30px] outline-0 border border-slate-400 rounded"
                        >
                            <option value="">نوع پرداخت</option>
                            <option value="انلاین">انلاین</option>
                            <option value="پرداخت در محل">پرداخت در محل</option>
                            <option value="کیف پول">کیف پول</option>
                        </select>
                    </div>

                    {/* مرتب‌سازی */}
                    <div className="flex flex-col mr-3">
                        <select
                            name="sort"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="text-slate-600 w-[220px] md:w-[170px] mt-2 h-[30px] outline-0 border border-slate-400 rounded"
                        >
                            <option value="">جدیدترین</option>
                            <option value="قدیمی‌ترین">قدیمی‌ترین</option>
                            <option value="بیشترین مبلغ">بیشترین مبلغ</option>
                            <option value="کمترین مبلغ">کمترین مبلغ</option>
                        </select>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default OrdersPage;
