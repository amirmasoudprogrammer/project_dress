"use client"
import React, {useState} from 'react';
import Link from "next/link";
import {AnimatePresence, motion} from "framer-motion";

function PermissionsPage(props) {
    const [showPopup, setShowPopup] = useState(false);
    const startSubmit = (e) =>{
        e.preventDefault()
    }
    return (
        <div className="mt-28 z-10">
            <div>
                <span className="text-black mr-8 text-[25px] font-bold">مدیریت مجوز ها</span>
            </div>
            <div className='flex items-center justify-between mt-11'>
                <div>
                    <span className="text-black mr-8 text-[14px] font-bold">لیست مجوز ها</span>
                </div>
                <div className="flex items-center justify-between ml-5">
                    <div onClick={() => setShowPopup(true)}
                         className="cursor-pointer w-[130px] h-[40px] flex items-center justify-center rounded bg-blue-600 text-white text-[13px]">افزودن
                   مجوز جدید
                    </div>

                    <Link href="/Admin_Dashboard/Users/roles" className="w-[130px] h-[40px] mr-3 flex items-center justify-center rounded bg-indigo-600 text-white text-[13px]"> مدیرت نقش ها</Link>
                    <Link href=""
                          className="w-[130px] h-[40px] mr-3 flex items-center justify-center rounded bg-green-500 text-white text-[13px]"> تست
                        API</Link>

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
                        <th className="px-1 py-1">  نام مجوز ها</th>
                        <th className="px-1 py-1">توضیحات</th>
                        <th className="px-1 py-1"> محافظ</th>
                        <th className="px-1 py-1">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="text-center">
                        <td className="px-1 py-1 text-[12px]"> view-users</td>
                        <td className="px-1 py-1 text-[12px]">-</td>
                        <td className="px-1 py-1  text-[12px]">web</td>
                        <td className="flex items-center justify-center text-[19px]">
                            <Link href="" className="mr-2 text-white w-[70px] bg-orange-400 p-1 rounded hover:underline text-[12px]">ویرایش</Link>
                            <Link href=""
                                  className="mr-2 text-white w-[70px] bg-red-500 p-1 rounded hover:underline ml-2 text-[12px]"> حذف</Link>
                        </td>
                    </tr>
                    <tr className="text-center">
                        <td className="px-1 py-1 text-[12px]"> view-users</td>
                        <td className="px-1 py-1 text-[12px]">-</td>
                        <td className="px-1 py-1  text-[12px]">web</td>
                        <td className="flex items-center justify-center text-[19px]">
                            <Link href="" className="mr-2 text-white w-[70px] bg-orange-400 p-1 rounded hover:underline text-[12px]">ویرایش</Link>
                            <Link href=""
                                  className="mr-2 text-white w-[70px] bg-red-500 p-1 rounded hover:underline ml-2 text-[12px]"> حذف</Link>
                        </td>
                    </tr>
                    <tr className="text-center">
                        <td className="px-1 py-1 text-[12px]"> view-users</td>
                        <td className="px-1 py-1 text-[12px]">-</td>
                        <td className="px-1 py-1  text-[12px]">web</td>
                        <td className="flex items-center justify-center text-[19px]">
                            <Link href="" className="mr-2 text-white w-[70px] bg-orange-400 p-1 rounded hover:underline text-[12px]">ویرایش</Link>
                            <Link href=""
                                  className="mr-2 text-white w-[70px] bg-red-500 p-1 rounded hover:underline ml-2 text-[12px]"> حذف</Link>
                        </td>
                    </tr>
                    <tr className="text-center">
                        <td className="px-1 py-1 text-[12px]"> view-users</td>
                        <td className="px-1 py-1 text-[12px]">-</td>
                        <td className="px-1 py-1  text-[12px]">web</td>
                        <td className="flex items-center justify-center text-[19px]">
                            <Link href="" className="mr-2 text-white w-[70px] bg-orange-400 p-1 rounded hover:underline text-[12px]">ویرایش</Link>
                            <Link href=""
                                  className="mr-2 text-white w-[70px] bg-red-500 p-1 rounded hover:underline ml-2 text-[12px]"> حذف</Link>
                        </td>
                    </tr>
                    <tr className="text-center">
                        <td className="px-1 py-1 text-[12px]"> view-users</td>
                        <td className="px-1 py-1 text-[12px]">-</td>
                        <td className="px-1 py-1  text-[12px]">web</td>
                        <td className="flex items-center justify-center text-[19px]">
                            <Link href="" className="mr-2 text-white w-[70px] bg-orange-400 p-1 rounded hover:underline text-[12px]">ویرایش</Link>
                            <Link href=""
                                  className="mr-2 text-white w-[70px] bg-red-500 p-1 rounded hover:underline ml-2 text-[12px]"> حذف</Link>
                        </td>
                    </tr>
                    <tr className="text-center">
                        <td className="px-1 py-1 text-[12px]"> view-users</td>
                        <td className="px-1 py-1 text-[12px]">-</td>
                        <td className="px-1 py-1  text-[12px]">web</td>
                        <td className="flex items-center justify-center text-[19px]">
                            <Link href="" className="mr-2 text-white w-[70px] bg-orange-400 p-1 rounded hover:underline text-[12px]">ویرایش</Link>
                            <Link href=""
                                  className="mr-2 text-white w-[70px] bg-red-500 p-1 rounded hover:underline ml-2 text-[12px]"> حذف</Link>
                        </td>
                    </tr>
                    <tr className="text-center">
                        <td className="px-1 py-1 text-[12px]"> view-users</td>
                        <td className="px-1 py-1 text-[12px]">-</td>
                        <td className="px-1 py-1  text-[12px]">web</td>
                        <td className="flex items-center justify-center text-[19px]">
                            <Link href="" className="mr-2 text-white w-[70px] bg-orange-400 p-1 rounded hover:underline text-[12px]">ویرایش</Link>
                            <Link href=""
                                  className="mr-2 text-white w-[70px] bg-red-500 p-1 rounded hover:underline ml-2 text-[12px]"> حذف</Link>
                        </td>
                    </tr>
                    <tr className="text-center">
                        <td className="px-1 py-1 text-[12px]"> view-users</td>
                        <td className="px-1 py-1 text-[12px]">-</td>
                        <td className="px-1 py-1  text-[12px]">web</td>
                        <td className="flex items-center justify-center text-[19px]">
                            <Link href="" className="mr-2 text-white w-[70px] bg-orange-400 p-1 rounded hover:underline text-[12px]">ویرایش</Link>
                            <Link href=""
                                  className="mr-2 text-white w-[70px] bg-red-500 p-1 rounded hover:underline ml-2 text-[12px]"> حذف</Link>
                        </td>
                    </tr>
                    <tr className="text-center">
                        <td className="px-1 py-1 text-[12px]"> view-users</td>
                        <td className="px-1 py-1 text-[12px]">-</td>
                        <td className="px-1 py-1  text-[12px]">web</td>
                        <td className="flex items-center justify-center text-[19px]">
                            <Link href="" className="mr-2 text-white w-[70px] bg-orange-400 p-1 rounded hover:underline text-[12px]">ویرایش</Link>
                            <Link href=""
                                  className="mr-2 text-white w-[70px] bg-red-500 p-1 rounded hover:underline ml-2 text-[12px]"> حذف</Link>
                        </td>
                    </tr>
                    <tr className="text-center">
                        <td className="px-1 py-1 text-[12px]"> view-users</td>
                        <td className="px-1 py-1 text-[12px]">-</td>
                        <td className="px-1 py-1  text-[12px]">web</td>
                        <td className="flex items-center justify-center text-[19px]">
                            <Link href="" className="mr-2 text-white w-[70px] bg-orange-400 p-1 rounded hover:underline text-[12px]">ویرایش</Link>
                            <Link href=""
                                  className="mr-2 text-white w-[70px] bg-red-500 p-1 rounded hover:underline ml-2 text-[12px]"> حذف</Link>
                        </td>
                    </tr>
                    <tr className="text-center">
                        <td className="px-1 py-1 text-[12px]"> view-users</td>
                        <td className="px-1 py-1 text-[12px]">-</td>
                        <td className="px-1 py-1  text-[12px]">web</td>
                        <td className="flex items-center justify-center text-[19px]">
                            <Link href="" className="mr-2 text-white w-[70px] bg-orange-400 p-1 rounded hover:underline text-[12px]">ویرایش</Link>
                            <Link href=""
                                  className="mr-2 text-white w-[70px] bg-red-500 p-1 rounded hover:underline ml-2 text-[12px]"> حذف</Link>
                        </td>
                    </tr>
                    <tr className="text-center">
                        <td className="px-1 py-1 text-[12px]"> view-users</td>
                        <td className="px-1 py-1 text-[12px]">-</td>
                        <td className="px-1 py-1  text-[12px]">web</td>
                        <td className="flex items-center justify-center text-[19px]">
                            <Link href="" className="mr-2 text-white w-[70px] bg-orange-400 p-1 rounded hover:underline text-[12px]">ویرایش</Link>
                            <Link href=""
                                  className="mr-2 text-white w-[70px] bg-red-500 p-1 rounded hover:underline ml-2 text-[12px]"> حذف</Link>
                        </td>
                    </tr>




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
                            <form className="space-y-4" onSubmit={startSubmit}>
                                <div className="flex flex-col">
                                    <label className="mr-2 mb-2 text-[13px]">نام نقش :</label>
                                    <input type="text" placeholder=" نام نقش را وارد کنید" className="w-full border px-3 py-2 rounded"/>
                                </div>
                                <div className="flex flex-col">
                                    <label className="mr-2 mb-2 text-[13px]">توضیحات  </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="توضیحات محصول را وارد کنید"
                                        className="w-[350px] pr-3 pt-2 mt-2 h-[150px] outline-0 border border-slate-400 rounded resize-none"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mr-2 mb-2 text-[13px]">محافظ  </label>
                                    <select id="section" name="section"
                                            className="text-slate-400  md:w-full mt-2 h-[37px] outline-0 border border-slate-400 rounded">
                                        <option value="web">web</option>
                                        <option value="api">api</option>
                                        <option value="sanctum">sanctum</option>

                                    </select>
                                </div>

                                <div className="w-full ml-auto flex items-end justify-end">
                                    <button
                                        onClick={() => setShowPopup(false)}
                                        className="bg-slate-200 w-[80px] rounded text-[13px] py-2 ml-2 mt-4 text-black text-sm hover:underline"
                                    >
                                        بستن
                                    </button>
                                    <button type="submit" className="w-[100px] text-[13px] bg-blue-600 text-white py-2 rounded">افزودن کاربر</button>

                                </div>
                            </form>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}

export default PermissionsPage;