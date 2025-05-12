"use client"
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {AnimatePresence, motion} from "framer-motion";
import NamePages from "@/components/admin/modules/NamePages";
import axios from "axios";
import Cookies from "js-cookie";

function RolesPage(props) {
    const [showPopup, setShowPopup] = useState(false);
    const [roles ,setRoles] =useState([])
    const [selectedRole, setSelectedRole] = useState("");
    console.log(selectedRole)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('tokenAdmin');

                const res = await axios.get('https://joppin.ir/api/v1/roles',{
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                });
                setRoles(res.data.data);
            } catch (error) {
                console.error('خطا در گرفتن داده‌ها:', error);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    console.log(roles)

    const startSubmit = (e) =>{
        e.preventDefault()
    }

    const selectedRoleData = roles.find(item => item.name === selectedRole);


    return (
        <div className="mt-28 z-10">
            <NamePages name="مدیریت نقش ها"/>
            <div className='flex items-center justify-between mt-11'>
                <div>
                    <span className="text-black mr-8 text-[14px] font-bold">لیست نقش ها</span>
                </div>
                <div className="flex items-center justify-between ml-5">
                    <div onClick={() => setShowPopup(true)}
                         className="cursor-pointer w-[130px] h-[40px] flex items-center justify-center rounded bg-blue-600 text-white text-[13px]">
                        نمایش اطلاعات نقش
                    </div>

                    <Link href="/Admin_Dashboard/Users/permissions"
                          className="w-[130px] h-[40px] mr-3 flex items-center justify-center rounded bg-green-500 text-white text-[13px]"> مدیرت
                        مجوز ها</Link>


                </div>
            </div>




            <div className="mt-10">
                <motion.table
                    initial={{y: 10, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{duration: 0.4}}
                    className="w-[90%] mr-8 table-auto border border-gray-200 rounded-xl shadow border-separate border-spacing-y-1"
                >
                    <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="px-1 py-1">نام نقش</th>
                        <th className="px-1 py-1">توضیحات</th>
                        <th className="px-1 py-1"> محافظ</th>
                        <th className="px-1 py-1">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        roles.map((item) =>
                            <tr className="text-center" key={item.id}>
                                <td className="px-1 py-1 text-[12px]">{item.name}</td>
                                <td className="px-1 py-1 text-[12px]">-</td>
                                <td className="px-1 py-1  text-[12px]">{item.guard_name}</td>
                                <td className="flex items-center justify-center text-[19px]">
                                    <Link href=""
                                          className="mr-2 text-white w-[70px] bg-orange-400 p-1 rounded hover:underline text-[12px]">ویرایش</Link>
                                    <Link href=""
                                          className="mr-2 text-white w-[70px] bg-blue-600 p-1 rounded hover:underline  text-[12px]">مجوز
                                        ها</Link>
                                    <Link href=""
                                          className="mr-2 text-white w-[70px] bg-red-500 p-1 rounded hover:underline ml-2 text-[12px]"> حذف</Link>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </motion.table>

            </div>


            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.3}}
                        className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
                    >
                        <motion.div
                            initial={{scale: 0.8}}
                            animate={{scale: 1}}
                            exit={{scale: 0.8}}
                            transition={{duration: 0.3}}
                            className="bg-white p-6 rounded-xl w-[400px] shadow-xl text-right"
                        >
                            <h2 className="text-lg font-bold mb-4">افزودن نقش جدید</h2>
                            <form className="space-y-4" >
                                <select
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                    className="border rounded px-3 py-2 w-full"
                                >
                                    <option value="">انتخاب نقش</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.name}>
                                            {role.name || role.label}
                                        </option>
                                    ))}
                                </select>

                                {selectedRoleData?.permissions?.length > 0 && (
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                        <h3 className="text-sm font-bold mb-2 text-gray-700">وظایف این نقش:</h3>
                                        <ul className="max-h-[150px] overflow-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                            {selectedRoleData.permissions.map((perm) => (
                                                <li key={perm.id} className="text-sm px-3 py-2 bg-blue-100 text-blue-800 rounded shadow-sm">
                                                    {perm.label || perm.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="w-full ml-auto flex items-end justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setShowPopup(false)}
                                        className="bg-slate-200 w-[80px] rounded text-[13px] py-2 ml-2 mt-4 text-black text-sm hover:underline"
                                    >
                                        بستن
                                    </button>

                                </div>
                            </form>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>

    );
}

export default RolesPage;