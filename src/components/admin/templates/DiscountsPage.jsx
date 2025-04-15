"use client"
import React, {useState} from 'react';
import {AiOutlineDollar} from "react-icons/ai";
import {CiCircleCheck} from "react-icons/ci";
import {TbClockHour2} from "react-icons/tb";
import {LuTicket} from "react-icons/lu";
import {FaPlus} from "react-icons/fa6";
import {IoIosSearch} from "react-icons/io";


function DiscountsPage(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState('');
    const discounts = [
        {
            title: 'تخفیف نوروزی',
            code: 'NOWRUZ1404',
            percent: 20,
            startDate: '1404/01/01',
            endDate: '1404/01/15',
            status: 'فعال',
        },
        {
            title: 'پاییزه',
            code: 'FALL50',
            percent: 50,
            startDate: '1403/08/01',
            endDate: '1403/08/30',
            status: 'غیرفعال',
        },
    ];

    return (
        <div className="mt-28 z-10">
            <div>
                <span className="text-black mr-8 text-[25px] font-bold">مدیرت تخفیفات</span>
            </div>

            <div className='mt-5 flex items-center justify-between mr-8 ml-8'>
                <div
                    className="flex items-center justify-center p-1 w-[200px] h-[70px] shadow-xl cursor-pointer border border-slate-200 rounded transition-all duration-500 hover:shadow-sm">
                    <div
                        className="p-1 flex text-blue-500 text-[20px] bg-slate-300 rounded-full items-center justify-center w-[30px] h-[30px]">
                        <AiOutlineDollar/>
                    </div>
                    <span className="text-[12px] mr-2 text-slate-500">کل تخفیفات </span>
                </div>

                <div
                    className="flex items-center justify-center p-1 w-[200px] h-[70px] shadow-xl cursor-pointer border border-slate-200 rounded transition-all duration-500 hover:shadow-sm">
                    <div
                        className="p-1 flex text-green-500 text-[20px] bg-green-200 rounded-full items-center justify-center w-[30px] h-[30px]">
                        <CiCircleCheck/>

                    </div>

                    <span className="text-[12px] mr-2 text-slate-500">فعال </span>


                </div>

                <div
                    className="flex items-center justify-center p-1 w-[200px] h-[70px] shadow-xl cursor-pointer border border-slate-200 rounded transition-all duration-500 hover:shadow-sm">
                    <div
                        className="p-1 flex text-yellow-400 text-[20px] bg-yellow-100 rounded-full items-center justify-center w-[30px] h-[30px]">
                        <TbClockHour2/>
                    </div>

                    <span className="text-[12px] mr-2 text-slate-500">منقضی شده </span>


                </div>

                <div
                    className="flex items-center justify-center p-1 w-[200px] h-[70px] shadow-xl cursor-pointer border border-slate-200 rounded transition-all duration-500 hover:shadow-sm">
                    <div
                        className="p-1 flex text-indigo-800 text-[30px] bg-indigo-200 rounded-full items-center justify-center w-[30px] h-[30px]">
                        <LuTicket/>

                    </div>

                    <span className="text-[12px] mr-2 text-slate-500">کد تخفیف</span>


                </div>

            </div>

            <div className="mr-8 mt-5 flex items-center justify-start">

                <div
                    className="group text-white ml-3 mt-2 flex items-center justify-center cursor-pointer w-[160px] h-[30px] bg-indigo-700 rounded">
                    <span className="group-hover:animate-pulse ">
                      <FaPlus/>

                    </span>

                    <span className="group-hover:font-bold transition-all text-white mr-2  text-[13px]">ایجاد تخفیف جدید</span>
                </div>

                {/* جستجو */}
                <div className="mt-2 flex rounded border border-slate-300 h-[30px] items-center justify-around">
                    <IoIosSearch/>
                    <input
                        type="text"
                        className="outline-0 border-0 pr-2"
                        placeholder="جستجو تخفیف"
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
                            <option value="">نوع تخفیف</option>
                            <option value="موجود">موجود</option>
                            <option value="کم موجود">کم موجود</option>
                            <option value="ناموجود">ناموجود</option>

                        </select>
                    </div>
                    <div className="flex flex-col mr-3">
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="text-slate-600 w-[220px] md:w-[170px] mt-2 h-[30px] outline-0 border border-slate-400 rounded"
                        >
                            <option value="">وضعیت موجودی</option>
                            <option value="موجود">موجود</option>
                            <option value="کم موجود">کم موجود</option>
                            <option value="ناموجود">ناموجود</option>

                        </select>
                    </div>

                </form>
            </div>

            <div className="overflow-x-auto rounded-xl shadow-md mt-6">
                <table className="min-w-full bg-white text-right text-sm text-gray-700">
                    <thead className="bg-gray-100 font-bold">
                    <tr>
                        <th className="p-4">عنوان تخفیف</th>
                        <th className="p-4">کد تخفیف</th>
                        <th className="p-4">درصد</th>
                        <th className="p-4">تاریخ شروع</th>
                        <th className="p-4">تاریخ پایان</th>
                        <th className="p-4">وضعیت</th>
                        <th className="p-4">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {discounts.map((item, idx) => (
                        <tr
                            key={idx}
                            className="border-b hover:bg-gray-50 transition duration-300"
                        >
                            <td className="p-4">{item.title}</td>
                            <td className="p-4">{item.code}</td>
                            <td className="p-4">{item.percent}%</td>
                            <td className="p-4">{item.startDate}</td>
                            <td className="p-4">{item.endDate}</td>
                            <td className="p-4">
                        <span
                            className={`px-2 py-1 rounded-full text-xs ${
                                item.status === 'فعال'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                            }`}
                        >
                            {item.status}
                        </span>
                            </td>
                            <td className="p-4">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded">
                                    ویرایش
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default DiscountsPage;