"use client"
import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {TbCategory2} from "react-icons/tb";
import {LiaEdit} from "react-icons/lia";
import {MdDelete} from "react-icons/md";
import axios from "axios";
import {toast} from "sonner";
import DeleteCategories from "@/components/admin/modules/DeleteCategories";
import EditCategories from "@/components/admin/modules/EditCategories";
import Cookies from "js-cookie";

function Popups({data:dataApi}) {
    const [popup, setPopup] = useState(null);
    const [popupEdit, setPopupEdit] = useState({show: false, item: null});
    const [deletePopup, setDeletePopup] = useState({show: false, id: null});
    const [data , setData] =useState(dataApi)

    useEffect( () =>{
        const fetchData = async () => {
            try {
                const token = Cookies.get('tokenAdmin');
                const res = await axios.get('https://joppin.ir/api/v1/admin/categories',{
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                });
                setData(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

        const interval = setInterval(() => {
            fetchData()
        }, 5000);

        return () => clearInterval(interval);
    },[])

    const confirmDelete = (id) => {
        setDeletePopup({show: true, id});
    };

    const openPopup = (description) => {
        setPopup(description);
    };

    const closePopup = () => {
        setPopup(null);
    };

    const openEditPopup = (item) => {
        setPopupEdit({show: true, item});
    }

    return (
        <>
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
                            <th className="px-4 py-2">نام دسته بندی</th>
                            <th className="px-4 py-2">دسته بندی والد</th>
                            <th className="px-4 py-2">توضیحات</th>
                            <th className="px-4 py-2">تعداد محصولات</th>
                            <th className="px-4 py-2">وضعیت</th>
                            <th className="px-4 py-2">عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data?.data.map((item) => (
                            <tr key={item.id} className="text-center h-[60px] align-middle">
                                <td className="p flex items-center justify-center">
                                    <div className="bg-slate-300 text-[18px] p-1 rounded">
                                        <TbCategory2/>
                                    </div>
                                    <div className="mr-3 text-[11px] flex flex-col items-start">
                                        <span className="text-black">{item.name}</span>
                                        <p className="text-slate-400 mt-0.5">کد #0001</p>
                                    </div>
                                </td>
                                <td>پوشاک</td>
                                <td className="py-2">
                                    <div className="flex items-center justify-center">
                                        <span className="text-black text-[12px] flex flex-col">
                                            {item.description && item.description.length > 100 ? (
                                                <>
                                                    {item.description.substring(0, 15)}
                                                    <button
                                                        onClick={() => openPopup(item.description)}
                                                        className="text-red-600 bg-red-300 p-1 rounded font-bold mt-1 ml-2 text-[10px]">
                                                        نمایش بیشتر
                                                    </button>
                                                </>
                                            ) : (
                                                item.description || "-"
                                            )}
                                        </span>
                                    </div>
                                </td>
                                <td>28</td>
                                <td className="px-3 py-2 text-white font-bold text-[12px] leading-none rounded-md text-center w-[80px]">
                                    <span
                                        className={`${item.is_active ? 'bg-green-300' : 'bg-red-300'} block w-full rounded-md py-1`}>
                                        {item.is_active ? 'فعال' : 'غیر فعال'}
                                    </span>
                                </td>
                                <td className="flex items-center justify-center text-[19px]">
                                    <div onClick={() => openEditPopup(item)}
                                         className="mr-2 text-blue-500 cursor-pointer"><LiaEdit/></div>
                                    <div onClick={() => confirmDelete(item.id)} className="mr-2 text-red-700 cursor-pointer"><MdDelete/></div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </motion.table>
                </div>
                {popup && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4">توضیحات کامل</h3>
                        <p>{popup}</p>
                        <button
                            onClick={closePopup}
                            className="mt-4 bg-red-500 text-white p-2 rounded"
                        >
                            بستن
                        </button>
                    </div>
                </div>)}
                <DeleteCategories deletePopup={deletePopup} setDeletePopup={setDeletePopup}/>
                <EditCategories popupEdit={popupEdit} setPopupEdit={setPopupEdit}/>

            </div>
        </>
    );
}

export default Popups;