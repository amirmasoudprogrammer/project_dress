"use client"
import React, {useEffect, useState} from 'react';
import {HiOutlineMailOpen} from "react-icons/hi";
import {MdOutlineMailOutline} from "react-icons/md";
import {SlCalender} from "react-icons/sl";
import {MdMarkEmailUnread} from "react-icons/md";
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"


import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";


function TicketPageAll({data}) {
    const [ticketAll, setTicketAll] = useState(data.data.data)
    console.log(ticketAll)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("token");
                const res = await axios.get('https://joppin.ir/api/v1/user/tickets' ,{
                    headers: {
                        Authorization: token ? `Bearer ${token}` : "",
                    }
                });
                const tickets = res.data?.data?.data || [];
                setTicketAll(tickets)

            } catch (error) {
                console.error('خطا در گرفتن داده‌ها:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    console.log(ticketAll)
    return (
        <div className="mt-14 flex flex-col md:mt-5 mr-2">
            <div className="flex flex-col items-start justify-between mt-5 md:mr-10  ">
                <span className="text-black text-[12px] font-bold">خلاصه پشتیبانی</span>
                <p className="w-[50px] h-[2px] bg-red-500 mt-1"></p>
            </div>
            <div className="w-[250px] h-[85px] md:w-[831px] pt-4 pb-4  md:pt-0 md:pb-0 md:h-[179px] flex items-center justify-around border border-slate-300 rounded md:mr-2 mt-5 shadow-lg">
                <Link href="@/components/client/module/TicketPageAll"
                      className="flex items-center justify-between flex-col">
                    <div
                        className="w-[30px] h-[30px] hover:animate-pulse text-[20px] md:text-[40px] font-thin bg-[#007AFF] ring-1 ring-sky-400 md:w-[60px] md:h-[60px] flex items-center justify-center rounded-full">
                        <HiOutlineMailOpen/>
                    </div>
                    <span className="text-[#007AFF] md:mt-2">0</span>
                    <p className="text-[#007AFF] text-[12px] md:text-[14px] font-medium md:mt-2">مکالمات باز</p>
                </Link>
                <Link href="@/components/client/module/TicketPageAll"
                      className="flex items-center justify-between flex-col">
                    <div
                        className="w-[30px] h-[30px] hover:animate-pulse text-[20px] md:text-[40px] font-thin bg-[#007AFF] ring-1 ring-sky-400 md:w-[60px] md:h-[60px] flex items-center justify-center rounded-full">
                        <MdOutlineMailOutline/>
                    </div>
                    <span className="text-[#007AFF] md:mt-2">0</span>
                    <p className="text-[#007AFF] text-[12px] md:text-[14px] font-medium md:mt-2">مکالمات بسته</p>
                </Link>
                <Link href="@/components/client/module/TicketPageAll"
                      className="flex items-center justify-between flex-col">
                    <div
                        className="w-[30px] h-[30px] hover:animate-pulse text-[20px] md:text-[40px] font-thin bg-[#007AFF] ring-1 ring-sky-400 md:w-[60px] md:h-[60px] flex items-center justify-center rounded-full">
                        <MdMarkEmailUnread/>
                    </div>
                    <span className="text-[#007AFF] md:mt-2">0</span>
                    <p className="text-[#007AFF] text-[12px] md:text-[14px] font-medium md:mt-2"> تمام مکالمات</p>
                </Link>
            </div>
            <div className="mt-10 md:mr-3">
                <span className="text-black font-medium">پیام های فیلتر</span>
                <div className="md:w-[831px] md:h-[117px] border border-slate-300 mt-5 shadow-xl rounded-lg">
                    <form action="@/components/client/module/TicketPageAll"
                          className="flex items-center flex-col md:flex-row justify-center mt-5 mb-5 md:mb-0">
                        <div className="text-black flex items-start flex-col cursor-pointer  ">
                            <label className="text-black mr-2" htmlFor="">از</label>
                            <div className="flex items-center border border-slate-300 rounded-lg">
                                <DatePicker
                                    calendar={persian}
                                    locale={persian_fa}
                                    calendarPosition="bottom-right"
                                    placeholder="تاریخ شروع را انتخاب کنید"
                                    style={{
                                        width: "auto",
                                        height: "37px",
                                        borderRadius: "8px",
                                        border: "none",
                                        fontFamily: "Estedad",
                                        fontSize: "15px"
                                    }}
                                />
                                <span className="ml-3">
                                  <SlCalender/>

                              </span>
                            </div>
                        </div>
                        <div className="text-black flex items-start flex-col cursor-pointer mt-3 md:mt-0 md:mr-3">
                            <label className="text-black mr-2" htmlFor="">به</label>
                            <div className="flex items-center border border-slate-300 rounded-lg">
                                <DatePicker
                                    calendar={persian}
                                    locale={persian_fa}
                                    calendarPosition="bottom-right"
                                    placeholder="تاریخ شروع را انتخاب کنید"
                                    style={{
                                        width: "auto",
                                        height: "37px",
                                        borderRadius: "8px",
                                        border: "none",
                                        fontFamily: "Estedad",
                                        fontSize: "15px"
                                    }}
                                />
                                <span className="ml-3">
                                  <SlCalender/>

                              </span>
                            </div>
                        </div>
                        <div className="text-black flex items-start flex-col md:-mt-2 md:mr-3 ">
                            <label className="text-black mr-2" htmlFor="">بخش</label>
                            <select id="section" name="section"
                                    className="text-slate-400 w-[220px] md:w-[160px] mt-2 h-[37px] outline-0 border border-slate-400 rounded">
                                <option value="">بخش</option>
                                <option value="website">وب‌سایت</option>
                                <option value="app">اپلیکیشن</option>
                                <option value="payment">پرداخت</option>
                                <option value="other">سایر</option>
                            </select>
                        </div>
                        <div className="text-black flex items-start flex-col md:-mt-2 md:mr-3">
                            <label className="text-black mr-2" htmlFor="">وضعیت</label>
                            <select id="section" name="section"
                                    className="text-slate-400 w-[220px] md:w-[150px] mt-2 h-[37px] outline-0 border border-slate-400 rounded">
                                <option value="">وضعیت</option>
                                <option value="website">وب‌سایت</option>
                                <option value="app">اپلیکیشن</option>
                                <option value="payment">پرداخت</option>
                                <option value="other">سایر</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div
                    className=" mr-auto rounded mt-5 bg-[#007AFF] md:w-[140px] h-[38px] flex items-center justify-center ">
                    <button className="text-[14px] font-medium">نتایج را نشان بده</button>
                </div>
            </div>
            <div className="mt-10 md:mt-0 mr-5">
                <span className="text-black font-medium md:mr-5">تاریخ پیام ها</span>
                {ticketAll.length === 0 && (
                    <div className="mt-10 h-[500px] flex items-center justify-center flex-col">
                        <Image src="/image/Group 1006.png" width={289} height={272} alt="icon"/>
                        <span className="text-black font-bold text-[16px]">شما پیامی ندارید!</span>
                        <p className="text-[#626262]">می‌توانید با مدرس ها یا پشتیبانی کارپل در تماس باشید</p>
                    </div>
                )}

                <div className="w-full bg-gray-50 rounded-xl shadow-md mt-5 p-6 flex flex-col md:flex-row gap-10">
                    {/* لیست تیکت‌ها */}
                    <div className="w-full">
                        {/* در سایز md به بالا: جدول کلاسیک */}
                        <div className="hidden md:grid grid-cols-4 gap-4 text-sm font-semibold text-gray-600 border-b pb-2">
                            <span>عنوان</span>
                            <span>تاریخ به‌روزرسانی</span>
                            <span>بخش</span>
                            <span>وضعیت</span>
                        </div>

                        {/* لیست تیکت‌ها */}
                        <div className="mt-4 space-y-4">
                            {ticketAll.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200"
                                >
                                    {/* موبایل کارت استایل */}
                                    <div className="block md:hidden space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-gray-600">عنوان:</span>
                                            <span className="text-gray-800">{item.title}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-gray-600">تاریخ:</span>
                                            <span className="text-gray-700 font-bold">
                {new Date(item.updated_at).toLocaleDateString("fa-IR")}
              </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-gray-600">بخش:</span>
                                            <span className="text-gray-700 text-[14px] font-bold">
                {item.category.name}
              </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold text-gray-600">وضعیت:</span>
                                            <span
                                                className={`text-white rounded px-2 py-1 text-sm ${
                                                    item.status === "open"
                                                        ? "bg-green-500"
                                                        : item.status === "بسته"
                                                            ? "bg-red-500"
                                                            : "bg-gray-400"
                                                }`}
                                            >
                {item.status}
              </span>
                                        </div>
                                    </div>

                                    {/* دسکتاپ جدول استایل */}
                                    <div className="hidden md:grid grid-cols-4 gap-4 text-sm">
                                        <span className="text-gray-800">{item.title}</span>
                                        <span className="text-gray-700 font-bold">{new Date(item.updated_at).toLocaleDateString("fa-IR")}</span>
                                        <span className="text-gray-700 text-[10px] font-bold">{item.category.name}</span>
                                        <span
                                            className={`text-white rounded text-center text-sm px-2 py-1 w-fit ${
                                                item.status === "open"
                                                    ? "bg-green-500"
                                                    : item.status === "بسته"
                                                        ? "bg-red-500"
                                                        : "bg-gray-400"
                                            }`}
                                        >
              {item.status}
            </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* انتخاب مکالمه */}
                    <div className="flex w-full flex-col items-center justify-center text-center space-y-4">
                        <Image
                            src="/image/undraw_drag-and-drop_v4po.svg"
                            width={200}
                            height={200}
                            alt="icon"
                        />
                        <h3 className="text-lg font-semibold text-gray-800">
                            مکالمه‌ای را انتخاب کنید
                        </h3>
                        <p className="text-sm text-gray-600 max-w-xs">
                            برای نمایش تاریخچه پیام‌ها، لطفاً یک مکالمه را با پشتیبانی انتخاب کنید.
                        </p>
                    </div>
                </div>


                <div className="md:w-[140px mt-10 h-[38px] bg-[#007AFF] mr-auto mb-10 flex items-center justify-center font-bold rounded">
                    <button>تیکت جدید</button>
                </div>
            </div>
        </div>
    );
}

export default TicketPageAll;