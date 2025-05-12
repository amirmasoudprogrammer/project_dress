"use client"
import React, {useEffect, useState} from "react";
import {FiEdit, FiTrash2, FiPlus} from "react-icons/fi";
import NamePages from "@/components/admin/modules/NamePages";
import axios from "axios";
import Link from "next/link";
import DeleteBlogs from "@/components/admin/modules/DeleteBlogs";
import {Toaster} from "sonner";
import EditBlogs from "@/components/admin/modules/EditBlogs";
import Cookies from "js-cookie";

function BlogsPage({data}) {
    const [search, setSearch] = useState("");
    const [blogs, setBlogs] = useState(data.data);
    const [deleteBlogs, setDeleteBlogs] = useState({show: false, id: null})
    const [editBlogs, setEditeBlogs] = useState({show: false, item: null})


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('tokenAdmin');
                const res = await axios.get('https://joppin.ir/api/v1/blog', {
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                });
                const fetchedBlogs = res?.data?.data;
                if (Array.isArray(fetchedBlogs)) {
                    setBlogs(fetchedBlogs);
                } else {
                    console.error("داده‌ها آرایه نیستند:", fetchedBlogs);
                }
            } catch (error) {
                console.error('خطا در گرفتن داده‌ها:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);


    const startDelet = (id) => {
        setDeleteBlogs({show: true, id: id})
    }

    const startEdit = (item) =>{
        setEditeBlogs({show: true , item:item})
    }


    return (
        <div className="p-6 mt-28">
            <Toaster expand={true} position="bottom-center" richColors/>
                <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-10">
                    📝 مدیریت وبلاگ
                </h1>
            <div className="flex items-start justify-start gap-4 w-full md:w-auto">
                <Link href="/Admin_Dashboard/Blogs/add"
                      className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700">
                    <FiPlus size={18}/>افزودن پست جدید
                </Link>

                <input
                    type="text"
                    placeholder="جستجو..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded-xl px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="bg-white rounded-2xl shadow p-4 flex flex-col justify-between"
                    >
                        <img
                            src={blog.images?.[0]?.image_path}
                            alt={blog.title}
                            className="w-full h-40 object-cover rounded-xl mb-4"
                        />
                        <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{blog.content}</p>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => startEdit(blog)} className="text-blue-500 hover:text-blue-700">
                                <FiEdit size={20}/>
                            </button>
                            <button className="text-red-500 hover:text-red-700" onClick={() => startDelet(blog.id)}>
                                <FiTrash2 size={20}/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            {deleteBlogs.show && (<DeleteBlogs deleteBlogs={deleteBlogs} setDeleteBlogs={setDeleteBlogs}/>)}
            {editBlogs.show && (<EditBlogs editBlogs={editBlogs} setEditeBlogs={setEditeBlogs}/>)}
        </div>
    );
}

export default BlogsPage;
