import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {convertToPersianDate} from "@/helper/convertToPersianDate";
import {LiaEdit} from "react-icons/lia";
import {MdDelete} from "react-icons/md";
import {IoClose} from "react-icons/io5";
import axios from "axios";
import {toast} from "sonner";
import Cookies from "js-cookie";


function DataTable({confirmDelete, data, loading, setLoading}) {
    const [showModal, setShowModal] = useState({show: false, id: null})
    const [name, setName] = useState("");
    const [position, setPosition] = useState("0");
    const [status, setStatus] = useState("1");
    const [image, setImage] = useState(null);
    const [dataApi, setDataApi] = useState([])



    useEffect( () =>{
        const fetchData = async () => {
            try {

                const token = Cookies.get('tokenAdmin');
                const res = await axios.get('https://joppin.ir/api/banners' ,{
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                });
              const result = res.data.data
                setDataApi(result);
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

    const startEdit = (banner) => {
        setName(banner.alt);
        setPosition(banner.position);
        setStatus(banner.status ? "1" : "0");
        setImage(null);
        setShowModal({show: true, id: banner.id});
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        const formData = new FormData();
        formData.append("alt", name);
        formData.append("position", position);
        formData.append("status", status);
        formData.append("_method", "PUT");

        if (image) {
            formData.append("image", image);
        }

        try {
            const res = await axios.post(`https://joppin.ir/api/banners/${showModal.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            });
            console.log(res)
            if (res.status === 200) {
                toast.success("دسته‌بندی با موفقیت ویرایش شد.");
                const {data} = await axios.get("https://joppin.ir/api/banners");
                setDataApi(data);
                setShowModal({show: false, id: null});
            }


        } catch (error) {
            toast.error("ویرایش با خطا مواجه شد.");
            console.error(error);
        } finally {
            setLoading(false);
        }

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
                        <thead className="bg-gray-100 text-gray-700 text-sm">
                        <tr>
                            <th className="px-4 py-2">پیش‌نمایش</th>
                            <th className="px-4 py-2"> نام بنر</th>
                            <th className="px-4 py-2">پوزیشن</th>
                            <th className="px-4 py-2">وضعیت</th>
                            <th className="px-4 py-2">تاریخ ایجاد</th>
                            <th className="px-4 py-2">عملیات</th>
                        </tr>
                        </thead>
                        <tbody className="text-center text-sm">
                        {dataApi.map((banner) => (
                            <tr key={banner.id}>
                                <td className="flex items-center justify-center">
                                    <Image
                                        src={banner.image}
                                        alt="image" width={80} height={80}
                                        className="w-10 h-10 object-cover rounded"
                                    />
                                </td>
                                <td className="text-black text-[12px] m-0 p-0">{banner.alt}</td>
                                <td>
                                    <Link href="/" className="text-blue-600 hover:underline">
                                        {banner.position}
                                    </Link>
                                </td>
                                <td>
                                        <span
                                            className={`${
                                                banner.status ? "bg-green-500" : "bg-red-500"
                                            }  px-2 py-1 text-white text-xs rounded-full`}
                                        >
                                            {banner.status ? "فعال" : "غیر فعال"}
                                        </span>
                                </td>
                                <td>{convertToPersianDate(banner.data)} </td>
                                <td className="flex items-center justify-center text-[19px]">
                                    <div onClick={() => startEdit(banner)}
                                         className="mr-2 cursor-pointer text-blue-500 hover:underline ml-2">
                                        <LiaEdit/>
                                    </div>
                                    <div onClick={() => confirmDelete(banner.id)}
                                         className="mr-2 text-red-700 cursor-pointer"><MdDelete/></div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </motion.table>
                </div>
            </div>

            <AnimatePresence>
                {showModal.show && (
                    <motion.div
                        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <motion.div
                            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative"
                            initial={{y: -50, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            exit={{y: -50, opacity: 0}}
                        >
                            <button
                                className="absolute left-3 top-3 text-gray-500 hover:text-black"
                                onClick={() => setShowModal(false)}
                            >
                                <IoClose size={24}/>
                            </button>

                            <h2 className="text-lg font-bold mb-4 text-center">افزودن بنر جدید</h2>

                            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 text-sm">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="نام بنر"
                                    className="border border-gray-300 p-2 rounded"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    name="image"
                                    type="file"
                                    className="border border-gray-300 p-2 rounded"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                                <div className="flex flex-col">
                                    <label>پوزیشن</label>
                                    <select
                                        name="position"
                                        className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
                                        value={position}
                                        onChange={(e) => setPosition(e.target.value)}
                                    >
                                        <option value="">انتخاب کنید</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label>وضعیت</label>
                                    <select
                                        name="status"
                                        className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
                                        value={status}
                                        onChange={(e) => setStatus(Number(e.target.value))}
                                    >
                                        <option value="1">ON</option>
                                        <option value="0">OFF</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                                >
                                    {loading ? "در حال ذخیره..." : "ذخیره بنر"}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default DataTable;