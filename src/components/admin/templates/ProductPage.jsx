"use client"
import React from 'react';
import Link from "next/link";
import {FaPlus} from "react-icons/fa6";
import {IoIosSearch} from "react-icons/io";
import {motion} from "framer-motion";
import {GrFormView} from "react-icons/gr";
import {LiaEdit} from "react-icons/lia";
import {MdDelete} from "react-icons/md";
import {CiImageOn} from "react-icons/ci";


function ProductPage(props) {
    return (
        <div className="mt-28 z-10">
            <div>
                <span className="text-black mr-8 text-[25px] font-bold">مدیرت محصولات</span>
            </div>
            <div className="flex items-center justify-start mr-8 mt-3">
                <Link href="/Admin_Dashboard/Product/add"
                      className="flex items-center justify-center bg-indigo-700 p-2 text-[12px] text-white rounded">
                    <FaPlus/>
                    <span className="mr-2 text-white">افزودن محصول جدید</span>
                </Link>
                <form className="mr-3 flex">
                    <div className="mt-2 flex rounded border border-slate-300 h-[30px] items-center justify-around">
                        <IoIosSearch/>
                        <input type="text" className="outline-0 border-0 " placeholder="جستجو محصول"/>
                    </div>
                    <div className=" mr-5 -mt-1">
                        <select id="section" name="section"
                                className="text-slate-400 w-[220px] md:w-[160px] mt-2 h-[37px] outline-0 border border-slate-400 rounded">
                            <option value="">همه دسته بندی</option>
                            <option value="website">پوشاک</option>
                            <option value="app">کفش</option>
                            <option value="payment">اکسسوری</option>
                        </select>

                    </div>
                </form>
            </div>
            <div className="mt-10">
                <div className="overflow-x-auto">
                    <motion.table
                        initial={{y: 10, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{duration: 0.4}}
                        className="w-[90%] mr-8 table-auto border border-gray-200 rounded-xl shadow border-separate border-spacing-y-6"
                    >
                        <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-2">نام محصول</th>
                            <th className="px-4 py-2">دسته‌بندی</th>
                            <th className="px-4 py-2">قیمت (تومان)</th>
                            <th className="px-4 py-2">موجودی</th>
                            <th className="px-4 py-2">وضعیت</th>
                            <th className="px-4 py-2">عملیات</th>
                        </tr>
                        </thead>
                        <tbody className="">
                        <tr className="text-center ">
                            <td className="p flex items-center justify-center">
                                <div className="bg-slate-300 text-[18px] p-1 rounded">
                                    <CiImageOn/>
                                </div>
                                <div className="mr-3 text-[11px] flex flex-col items-start">
                                    <span>محصول شماره 1</span>
                                    <p className="text-slate-400 mt-0.5">کد #0001</p>
                                </div>
                            </td>
                            <td className=" ">مصالح ساختمانی</td>
                            <td className="">۵۵۰,۰۰۰</td>
                            <td className="">۱۲۵</td>
                            <td className="bg-green-300 text-white font-bold text-[10px] leading-none rounded-sm text-center w-[2px] h-[3px]">موجود</td>
                            <td className=" flex items-center justify-center text-[19px]">
                                <Link href=""
                                      className="mr-2 text-blue-600 hover:underline text-[20px]"><GrFormView/></Link>
                                <Link href="" className="mr-2 text-blue-500 hover:underline ml-2"><LiaEdit/></Link>
                                <Link href="" className="mr-2 text-red-700 hover:underline ml-2"><MdDelete/></Link>
                            </td>
                        </tr>
                        <tr className="text-center">
                            <td className="flex items-center justify-center">
                                <div className="bg-slate-300 text-[18px] p-1 rounded">
                                    <CiImageOn/>
                                </div>
                                <div className="mr-3 text-[11px] flex flex-col items-start">
                                    <span>محصول شماره 1</span>
                                    <p className="text-slate-400 mt-0.5">کد #0001</p>
                                </div>
                            </td>
                            <td className=" ">مصالح ساختمانی</td>
                            <td className=" ">۵۵۰,۰۰۰</td>
                            <td className=" ">۱۲۵</td>
                            <td className="bg-green-300 text-white font-bold text-[10px] leading-none rounded-sm text-center w-[2px] h-[3px]">موجود</td>
                            <td className="  flex items-center justify-center text-[19px]">
                                <Link href=""
                                      className="mr-2 text-blue-600 hover:underline text-[20px]"><GrFormView/></Link>
                                <Link href="" className="mr-2 text-blue-500 hover:underline ml-2"><LiaEdit/></Link>
                                <Link href="" className="mr-2 text-red-700 hover:underline ml-2"><MdDelete/></Link>
                            </td>
                        </tr>
                        <tr className="text-center">
                            <td className="  flex items-center justify-center">
                                <div className="bg-slate-300 text-[18px] p-1 rounded">
                                    <CiImageOn/>
                                </div>
                                <div className="mr-3 text-[11px] flex flex-col items-start">
                                    <span>محصول شماره 1</span>
                                    <p className="text-slate-400 mt-0.5">کد #0001</p>
                                </div>
                            </td>
                            <td className=" ">مصالح ساختمانی</td>
                            <td className=" ">۵۵۰,۰۰۰</td>
                            <td className=" ">۱۲۵</td>
                            <td className="bg-red-400 text-white font-bold text-[10px] leading-none rounded-sm text-center w-[2px] h-[3px]">ناموجود</td>
                            <td className="  flex items-center justify-center text-[19px]">
                                <Link href=""
                                      className="mr-2 text-blue-600 hover:underline text-[20px]"><GrFormView/></Link>
                                <Link href="" className="mr-2 text-blue-500 hover:underline ml-2"><LiaEdit/></Link>
                                <Link href="" className="mr-2 text-red-700 hover:underline ml-2"><MdDelete/></Link>
                            </td>
                        </tr>
                        <tr className="text-center">
                            <td className="  flex items-center justify-center">
                                <div className="bg-slate-300 text-[18px] p-1 rounded">
                                    <CiImageOn/>
                                </div>
                                <div className="mr-3 text-[11px] flex flex-col items-start">
                                    <span>محصول شماره 1</span>
                                    <p className="text-slate-400 mt-0.5">کد #0001</p>
                                </div>
                            </td>
                            <td className=" ">مصالح ساختمانی</td>
                            <td className=" ">۵۵۰,۰۰۰</td>
                            <td className=" ">۱۲۵</td>
                            <td className="bg-yellow-500 text-white font-bold text-[10px] leading-none rounded-sm text-center w-[2px] h-[3px]">کم
                                موجود
                            </td>
                            <td className="  flex items-center justify-center text-[19px]">
                                <Link href=""
                                      className="mr-2 text-blue-600 hover:underline text-[20px]"><GrFormView/></Link>
                                <Link href="" className="mr-2 text-blue-500 hover:underline ml-2"><LiaEdit/></Link>
                                <Link href="" className="mr-2 text-red-700 hover:underline ml-2"><MdDelete/></Link>
                            </td>
                        </tr>
                        </tbody>
                    </motion.table>
                </div>
            </div>
            <div className="mt-5">
                <div>
                    <span className="mr-8 text-[14px] font-normal">نمایش 1 تا5 از 12نتیجه</span>

                </div>
            </div>
        </div>

    );
}

export default ProductPage;
