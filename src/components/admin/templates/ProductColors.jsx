"use client"
import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {LiaEdit} from "react-icons/lia";
import {MdDelete} from "react-icons/md";
import Cookies from "js-cookie";
import axios from "axios";
import colors from 'tailwindcss/colors';
import {FaPlus} from "react-icons/fa6";
import EditColors from "@/components/admin/modules/EditColors";
import ColorDelete from "@/components/admin/modules/ColorDelete";
import {Toaster} from "sonner";
import PopupAddColors from "@/components/admin/modules/PopupAddColors";

function ProductColors(props) {
    const [color, setColor] = useState([])
    const [showColorAdd, setShowColorAdd] = useState(false)
    const [showColorDelete, setShowColorDelete] = useState({show: false, id: null})
    const [showColorEdit, setShowColorEdit] = useState({show: false, id: null})
    const [addColors, setAddColors] = useState(false)




    const fetchData = async () => {
        try {
            const token = Cookies.get('tokenAdmin');
            const res = await axios.get('https://joppin.ir/api/v1/admin/colors', {
                headers: token ? {Authorization: `Bearer ${token}`} : {}
            });
            setColor(res.data.data);
        } catch (error) {
            console.error("خطا در دریافت محصولات:", error);
        }
    };
    console.log(color)

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);


    const editColor = (id) => {
        setShowColorEdit({show: true, id: id})
    }
    const deleteColor = (id) => {
        setShowColorDelete({show: true, id: id})
    }

    return (
        <div className="mt-10">
            <Toaster expand={true} position="bottom-center" richColors/>
            <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-10">
                🛍️ مدیریت رنگ ها
            </h1>


            <div className="mt-6 flex justify-start w-[90%] mx-auto">
                <button
                    onClick={() => setAddColors(!addColors)}
                    className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-300"
                >
                    <FaPlus className="text-white group-hover:rotate-90 transition-transform duration-300"/>
                    <span className="text-sm">افزودن رنگ جدید</span>
                </button>
            </div>


            <div className="mt-10 overflow-x-auto">
                <motion.table
                    initial={{y: 10, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{duration: 0.4}}
                    className="w-[90%] mx-auto table-auto border border-gray-200 rounded-2xl shadow-lg bg-white overflow-hidden"
                >
                    <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                    <tr>
                        <th className="px-6 py-4 text-right">نام رنگ</th>
                        <th className="px-6 py-4 text-right">نام نمایشی</th>
                        <th className="px-6 py-4 text-right">نمایش رنگ</th>
                        <th className="px-6 py-4 text-right">عملیات</th>
                    </tr>
                    </thead>

                    <tbody>
                    {color.map((color) => (
                        <tr
                            key={color.id}
                            className=" hover:bg-gray-50 transition duration-200 border-b last:border-none"
                        >
                            <td className="py-4 px-6 text-sm font-medium text-gray-800">{color.name}</td>
                            <td className="py-4 px-6 text-sm text-gray-600">{color.display_name}</td>
                            <td className="py-4 px-6">
                                <div
                                    className="w-6 h-6 rounded-full border border-gray-300  shadow"
                                    style={{backgroundColor: color.hex_code}}
                                />
                            </td>
                            <td className="py-4 px-6 flex justify-center items-center gap-5 text-xl text-gray-500">
                                <div
                                    onClick={() => editColor(color.id)}
                                    className="cursor-pointer text-blue-500 hover:text-blue-500 transition"
                                    title="ویرایش"
                                >
                                    <LiaEdit/>
                                </div>
                                <div
                                    onClick={() => deleteColor(color.id)}
                                    className="cursor-pointer text-red-500 hover:text-red-500 transition"
                                    title="حذف"
                                >
                                    <MdDelete/>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </motion.table>
            </div>


            {showColorEdit.show && <EditColors showColorEdit={showColorEdit} setShowColorEdit={setShowColorEdit}/>}
            {showColorDelete.show && <ColorDelete setShowColorDelete={setShowColorDelete} showColorDelete={showColorDelete}/>}
            {addColors && <PopupAddColors setAddColors={setAddColors}/>}

        </div>
    );
}

export default ProductColors;

