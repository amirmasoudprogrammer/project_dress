"use client";
import React, {useState} from 'react';
import Link from "next/link";
import axios from "axios";
import {Toaster, toast} from 'sonner';
import {FaPlus} from "react-icons/fa6";
import {IoIosSearch} from "react-icons/io";
import Popups from "@/components/admin/modules/Popups";
import NamePages from "@/components/admin/modules/NamePages";

function CategoriesPage({data}) {

    return (
        <div className="mt-28 z-10">
            <Toaster expand={true} position="bottom-center" richColors/>
            <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-10">
                🗂️ مدیریت دسته‌بندی‌ها
            </h1>

            <div className="flex items-center justify-start mr-8 mt-3">
                <Link href="/Admin_Dashboard/Categories/add"
                      className="flex items-center justify-center bg-indigo-700 p-2 text-[12px] text-white rounded">
                    <FaPlus/>
                    <span className="mr-2 text-white">افزودن دسته بندی جدید</span>
                </Link>
                <form className="mr-3 flex items-center">
                    <div className=" flex rounded border border-slate-300 h-[30px] items-center justify-around px-2">
                        <IoIosSearch/>
                        <input type="text" className="outline-0 border-0 ml-2" placeholder="جستجو محصول"/>
                    </div>
                    <div className=" mr-5 ">
                        <select id="section" name="section"
                                className="text-slate-400 w-[220px] md:w-[160px]  h-[30px] outline-0 border border-slate-400 rounded">
                            <option value="">همه دسته بندی</option>
                            <option value="website">پوشاک</option>
                            <option value="app">کفش</option>
                            <option value="payment">اکسسوری</option>
                        </select>
                    </div>
                </form>
            </div>
            <Popups data={data}/>
        </div>
    );
}

export default CategoriesPage;

