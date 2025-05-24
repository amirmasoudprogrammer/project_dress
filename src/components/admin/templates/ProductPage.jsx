"use client";

import React, {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";

import {FaPlus} from "react-icons/fa6";
import {IoIosSearch} from "react-icons/io";
import {LiaEdit} from "react-icons/lia";
import {MdDelete} from "react-icons/md";


import {motion} from "framer-motion";
import DeleteProducts from "@/components/admin/modules/DeleteProducts";
import EditProducts from "@/components/admin/modules/EditProducts";
import Cookies from "js-cookie";
import Image from "next/image";

function ProductPage({data}) {
    const [products, setProducts] = useState(data);
    const [categories, setCategories] = useState(null)
    const [deletePopup, setDeletePopup] = useState({show: false, id: null});
    const [popupEdit, setPopupEdit] = useState({show: false, item: null})
    const [searchValue, setSearchValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const Categories = async () => {
        const token = Cookies.get('tokenAdmin');
        const res = await axios.get('https://joppin.ir/api/v1/admin/categories',{
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        const result = res.data?.data
        const activeItems = result?.filter((item) => item.is_active);
        setCategories(activeItems)
    }

    const fetchData = async () => {
        try {
            const token = Cookies.get('tokenAdmin');
            const res = await axios.get('https://joppin.ir/api/v1/products', {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            setProducts(res.data);
        } catch (error) {
            console.error("خطا در دریافت محصولات:", error);
        }
    };

    useEffect(() => {
        fetchData();
        Categories();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);


    const confirmDelete = (id) => {
        setDeletePopup({show: true, id})
    }

    const confirmEdit = (item) => {
        setPopupEdit({show: true, item})
    }
    const filteredProducts = products?.data?.filter((item) => {
        const matchesCategory = selectedCategory === "all" || item.category.id === parseInt(selectedCategory);

        const matchesSearch = searchValue === ''
            || item.name.toLowerCase().includes(searchValue.toLowerCase())
            || item.description.toLowerCase().includes(searchValue.toLowerCase());

        return matchesCategory && matchesSearch;
    });
    console.log(filteredProducts)





    return (
        <div className="mt-28">
            <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-10">
                🛍️ مدیریت محصولات
            </h1>



            <div className="flex items-center justify-start mr-8 mt-3">
                <Link
                    href="/Admin_Dashboard/Product/add"
                    className="flex items-center justify-center bg-indigo-700 p-2 text-[12px] text-white rounded"
                >
                    <FaPlus/>
                    <span className="mr-2">افزودن محصول جدید</span>
                </Link>

                <form className="mr-3 flex">
                    <div className="mt-2 flex items-center h-[30px] border border-slate-300 rounded px-2">
                        <IoIosSearch/>
                        <input
                            type="text"
                            className="outline-none border-0 ml-2 text-sm"
                            placeholder="جستجو محصول"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>

                    <div className="mr-5 mt-2">
                        <select
                            id="section"
                            name="section"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="text-slate-400 w-[220px] md:w-[160px] h-[30px] border border-slate-400 rounded outline-none"
                        >
                            {categories?.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                            <option value="all">
                                همه
                            </option>
                        </select>
                    </div>
                </form>
            </div>


            <div className="mt-10 overflow-x-auto">
                <motion.table
                    initial={{y: 10, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{duration: 0.4}}
                    className="w-[90%] mr-8 table-auto border border-gray-200 rounded-xl shadow border-separate border-spacing-y-6"
                >
                    <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="px-4 py-2">تصویر</th>
                        <th className="px-4 py-2">نام محصول</th>
                        <th className="px-4 py-2">دسته‌بندی</th>
                        <th className="px-4 py-2">قیمت (تومان)</th>
                        <th className="px-4 py-2">موجودی</th>
                        <th className="px-4 py-2">وضعیت</th>
                        <th className="px-4 py-2">عملیات</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filteredProducts.map((item) => (
                        <tr key={item.id} className="text-center">
                             <td>
                                 <div className=" flex items-center justify-center text-[18px]  rounded">
                                     <Image src={item.featured_image} alt="Slide 1" width={20} height={20}/>
                                 </div>
                             </td>

                            <td className="flex items-center justify-center gap-2">
                                <div className="text-[11px] flex flex-col items-start">
                                    <span>{item.name}</span>
                                    <p className="text-slate-400 mt-0.5">کد #{item.sku}</p>
                                </div>
                            </td>
                            <td>{item.category?.name}</td>
                            <td>{item.price}</td>
                            <td>{"نامشخص"}</td>
                            <td
                                className={`text-white text-xs font-bold rounded px-2 py-1 ${
                                    item.status ? "bg-green-400" : "bg-red-500"
                                }`}
                            >
                                {item.status ? "فعال" : "غیرفعال"}
                            </td>
                            <td className="flex items-center justify-center gap-3 text-[20px]">

                                <div onClick={() => confirmEdit(item)} className="text-blue-500 cursor-pointer hover:underline">
                                    <LiaEdit/>
                                </div>
                                <div onClick={() => confirmDelete(item.id)}
                                     className="mr-2 text-red-700 cursor-pointer"><MdDelete/></div>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </motion.table>
            </div>


            <div className="mt-5">
        <span className="mr-8 text-[14px] font-normal">
          نمایش 1 تا 5 از 12 نتیجه
        </span>
            </div>


            <DeleteProducts deletePopup={deletePopup} setDeletePopup={setDeletePopup}/>
            <EditProducts popupEdit={popupEdit} setPopupEdit={setPopupEdit}/>
        </div>
    );
}

export default ProductPage;
