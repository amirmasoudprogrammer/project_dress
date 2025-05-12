"use client"
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {motion, AnimatePresence} from "framer-motion";
import NamePages from "@/components/admin/modules/NamePages";
import axios from "axios";
import {toast, Toaster} from "sonner";
import EditUser from "@/components/admin/modules/EditUser";
import UserRoles from "@/components/admin/modules/UserRoles";
import EditRoles from "@/components/admin/modules/EditRoles";
import DeleteRoles from "@/components/admin/modules/DeleteRoles";
import DeleteUser from "@/components/admin/modules/DeleteUser";
import DeleteAdmins from "@/components/admin/modules/DeleteAdmins";
import EditAdmin from "@/components/admin/modules/EditAdmin";
import AdminsRoles from "@/components/admin/modules/AdminsRoles";
import EditAdminRoles from "@/components/admin/modules/EditAdminRoles";
import Cookies from "js-cookie";

function UserPage({data}) {
    const [showPopup, setShowPopup] = useState(false);
    const [activeTab, setActiveTab] = useState("users");
    const [user, setUser] = useState([])
    const [formData, setFormData] = useState({
        user_name: '',
        email: '',
        password: ''
    })
    const [editPopups, setEditPopups] = useState({show: false, item: null})
    const [openRolesId, setOpenRolesId] = useState(null);
    const [Popuproles, setPopupRoles] = useState({show: false, id: null})
    const [editroles, setEditRoles] = useState({show: false, id: null})
    const [deleteRoles, setDeleteRoles] = useState({show: false, item: null})
    const [deleteUser, setDeleteUser] = useState({show: false, id: null})
    const [deleteAdmins, setDeleteAdmins] = useState({show: false, id: null})
    const [editAdmin, setEditAdmin] = useState({show: false, item: null})
    const [adminRolesid, setAdminRolesid] = useState(null)
    const [puprolesAdmin, setPopupRolesAdmin] = useState({show: false, id: null})
    const [editrolesAdmin, setEditRolesAdmin] = useState({show: false, id: null})


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('tokenAdmin');
                const res = await axios.get('https://joppin.ir/api/users',{
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                });
                setUser(res.data.data.data || []);

            } catch (error) {
                console.error('خطا در گرفتن داده‌ها:', error);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);


    const admins = user.filter(user => {
        const roleId = user.roles?.[0]?.pivot?.role_id;
        return roleId === "1" || roleId === "2";
    });

    const normalUsers = user.filter(user => {
        const roleId = user.roles?.[0]?.pivot?.role_id;
        return roleId === "3";
    });

    const startSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData()
        form.append("user_name", formData.user_name)
        form.append("email", formData.email)
        form.append("password", formData.password)

        const res = await axios.post(`https://joppin.ir/api/users`, form, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        console.log(res)
        if (res.status === 201) {
            toast.success(res.data.message);
            setShowPopup(false)
            setFormData({
                user_name: '',
                email: '',
                password: ''
            })
        }
    };

    const handlerOnChange = (e) => {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    }

    const startEdit = (item) => {
        setEditPopups({show: true, item: item})
    }

    const startRoles = (itemId) => {
        setOpenRolesId(prev => prev === itemId ? null : itemId);
    };

    const startPopup = (id) => {
        setPopupRoles({show: true, id: id})
    }

    const startEditPopup = (id) => {
        setEditRoles({show: true, id: id})
    }

    const startDeleteRoles = (item) => {
        setDeleteRoles({show: true, item: item})
    }

    const startDelete = (id) => {
        setDeleteUser({show: true, id: id})
    }

    const DeleteAdmin = (id) => {
        setDeleteAdmins({show: true, id: id})
    }

    const startEditAdmin = (item) => {
        setEditAdmin({show: true, item: item})
    }

    const startAdminRoles = (itemId) => {
        setAdminRolesid(prev => prev === itemId ? null : itemId)
    }

    const AdminRolesId = (id) => {
        setPopupRolesAdmin({show: true, id: id})
    }

    const AdminRolesEdit = (id) => {
        setEditRolesAdmin({show: true, id: id})
    }

    return (
        <div className="mt-28 z-10">
            <Toaster expand={true} position="bottom-center" richColors/>
            <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-10">
                👥 مدیریت کاربران
            </h1>


            <div className='flex items-center justify-between mt-11'>
                <div className="flex">
                    <div
                        onClick={() => setActiveTab("users")}
                        className={`cursor-pointer mr-8 text-[14px] font-bold px-3 py-1 rounded ${
                            activeTab === "users" ? "bg-blue-600 text-white" : "text-black"
                        }`}
                    >
                        لیست کاربران
                    </div>
                    <div
                        onClick={() => setActiveTab("admins")}
                        className={`cursor-pointer mr-8 text-[14px] font-bold px-3 py-1 rounded ${
                            activeTab === "admins" ? "bg-blue-600 text-white" : "text-black"
                        }`}
                    >
                        لیست مدیران
                    </div>
                </div>


                <div className="flex items-center justify-between ml-5">
                    <div onClick={() => setShowPopup(true)}
                         className="cursor-pointer w-[130px] h-[40px] flex items-center justify-center rounded bg-blue-600 text-white text-[13px]">
                        افزودن کاربر جدید
                    </div>
                    <Link href="/Admin_Dashboard/Users/roles"
                          className="w-[130px] h-[40px] mr-3 flex items-center justify-center rounded bg-indigo-500 text-white text-[13px]">
                        مدیریت نقش ها
                    </Link>
                    <Link href="/Admin_Dashboard/Users/permissions"
                          className="w-[130px] h-[40px] mr-3 flex items-center justify-center rounded bg-green-500 text-white text-[13px]">
                        مدیرت مجوز ها
                    </Link>
                </div>
            </div>


            <div className="mt-10">
                <motion.table
                    initial={{y: 10, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{duration: 0.4}}
                    className="container w-[90%] mx-auto mr-8 table-auto border border-gray-200 rounded-xl shadow border-separate border-spacing-y-1"
                >
                    <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="px-1 py-1">وضعیت</th>
                        <th className="px-1 py-1">نام</th>
                        <th className="px-1 py-1">نام کاربری</th>
                        <th className="px-1 py-1">ایمیل</th>
                        <th className="px-1 py-1">نقش</th>
                        <th className="px-1 py-1">تاریخ ثبت‌نام</th>
                        <th className="px-1 py-1">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {activeTab === "users" && (
                        normalUsers.map((item) =>
                            <tr className="text-center" key={item.id}>
                                <td className="px-1 py-1 text-[12px]">{item.roles.map(item => item.label)}</td>
                                <td className="px-1 py-1 text-[12px]">{item.name || "بدون نام"}</td>
                                <td className="px-1 py-1 text-[12px]">{item.user_name}</td>
                                <td className="px-1 py-1 text-[12px]">{item.email || "بدون ایمیل"}</td>
                                <td className="px-1 py-1 text-[12px]">{item.roles.map(item => item.name)}</td>
                                <td className="px-1 py-1 text-[12px]">{new Date(item.created_at).toLocaleDateString('fa-IR')}</td>
                                <td className="flex items-center flex-col justify-center text-[12px]">
                                    <div className="flex">
                                        <div onClick={() => startRoles(item.id)}
                                             className="cursor-pointer mr-2 text-white w-[70px] bg-blue-600 p-1 rounded hover:underline">نقش
                                        </div>

                                        <div onClick={() => startEdit(item)}
                                             className="cursor-pointer mr-2 text-white w-[70px] bg-orange-400 p-1 rounded hover:underline">ویرایش
                                        </div>

                                        <div onClick={() => startDelete(item.id)}
                                             className="cursor-pointer mr-2 text-white w-[70px] bg-red-500 p-1 rounded hover:underline ml-2">حذف
                                        </div>
                                    </div>
                                    <div className="flex mt-2 ml-2">
                                        {openRolesId === item.id && (
                                            <>
                                                <div onClick={() => startPopup(item.id)}
                                                     className="cursor-pointer mr-2 text-white w-[70px] bg-blue-600 p-1 rounded shadow-md transform hover:bg-blue-500 hover:scale-105 transition duration-300 text-[11px] text-center">
                                                    اهدا نقش
                                                </div>

                                                <div onClick={() => startEditPopup(item.id)}
                                                     className="cursor-pointer mr-2 text-white w-[70px] bg-orange-500 p-1 rounded shadow-md transform hover:bg-orange-400 hover:scale-105 transition duration-300 text-[11px] text-center">
                                                    ویرایش نقش
                                                </div>

                                                <div onClick={() => startDeleteRoles(item)}
                                                     className="cursor-pointer mr-2 text-white w-[70px] bg-red-600 p-1 rounded shadow-md transform hover:bg-red-500 hover:scale-105 transition duration-300 text-[11px] text-center">
                                                    حذف نقش
                                                </div>
                                            </>
                                        )}
                                    </div>


                                </td>
                            </tr>
                        )
                    )}
                    {activeTab === "admins" && (
                        admins.map(item => (
                            <tr className="text-center" key={item.id}>
                                <td className="px-1 py-1 text-[12px]">{item.roles.map(item => item.label)}</td>
                                <td className="px-1 py-1 text-[12px]">{item.name}</td>
                                <td className="px-1 py-1 text-[12px]">{item.user_name}</td>
                                <td className="px-1 py-1 text-[12px]">{item.email}</td>
                                <td className="px-1 py-1 text-[12px]">{item.roles.map(item => item.name)}</td>
                                <td className="px-1 py-1 text-[12px]">{new Date(item.created_at).toLocaleDateString('fa-IR')}</td>
                                <td className="flex items-center flex-col justify-center text-[12px]">
                                    <div className="flex">
                                        <div onClick={() => startEditAdmin(item)}
                                             className="cursor-pointer mr-2 text-white w-[70px] bg-orange-400 p-1 rounded hover:underline">ویرایش
                                        </div>
                                        <div onClick={() => startAdminRoles(item.id)}
                                             className="cursor-pointer mr-2 text-white w-[70px] bg-blue-400 p-1 rounded hover:underline">نقش
                                            ها
                                        </div>
                                        <div onClick={() => DeleteAdmin(item.id)}
                                             className="cursor-pointer mr-2 text-white w-[70px] bg-red-500 p-1 rounded hover:underline ml-2">حذف
                                        </div>
                                    </div>
                                    <div className="flex mt-2  ">
                                        {adminRolesid === item.id && (
                                            <>
                                                <div onClick={() => AdminRolesId(item.id)}
                                                     className="cursor-pointer mr-2 text-white w-[70px] bg-blue-600 p-1 rounded shadow-md transform hover:bg-blue-500 hover:scale-105 transition duration-300 text-[11px] text-center">
                                                    اهدا نقش
                                                </div>

                                                <div
                                                    onClick={() => AdminRolesEdit(item.id)}
                                                    className="cursor-pointer mr-2 text-white w-[70px] bg-orange-500 p-1 rounded shadow-md transform hover:bg-orange-400 hover:scale-105 transition duration-300 text-[11px] text-center">
                                                    ویرایش نقش
                                                </div>

                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>))
                    )}
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
                            <h2 className="text-lg font-bold mb-4">افزودن کاربر جدید</h2>
                            <form className="space-y-4" onSubmit={startSubmit}>
                                <div className="flex flex-col">
                                    <label className="mr-2 mb-2 text-[13px]">نام کاربری</label>
                                    <input type="text" name="user_name" value={formData.user_name}
                                           onChange={handlerOnChange} placeholder="نام کاربری"
                                           className="w-full border px-3 py-2 rounded"/>
                                </div>

                                <div className="flex flex-col">
                                    <label className="mr-2 mb-2 text-[13px]">ایمیل</label>
                                    <input type="email"
                                           name="email"
                                           value={formData.email}
                                           onChange={handlerOnChange}
                                           placeholder="ایمیل"
                                           className="w-full border px-3 py-2 rounded"/>
                                </div>
                                <div className="flex flex-col">
                                    <label className="mr-2 mb-2 text-[13px]">رمز عبور</label>
                                    <input type="password" placeholder="رمز عبور"
                                           value={formData.password}
                                           name="password"
                                           onChange={handlerOnChange}
                                           className="w-full border px-3 py-2 rounded"/>
                                </div>
                                <div className="w-full ml-auto flex items-end justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setShowPopup(false)}
                                        className="bg-slate-200 w-[80px] rounded text-[13px] py-2 ml-2 mt-4 text-black text-sm hover:underline">
                                        بستن
                                    </button>
                                    <button type="submit"
                                            className="w-[100px] text-[13px] bg-blue-600 text-white py-2 rounded">
                                        افزودن کاربر
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


            {deleteAdmins.show && (<DeleteAdmins deleteAdmins={deleteAdmins} setDeleteAdmins={setDeleteAdmins}/>)}
            {puprolesAdmin.show && (<AdminsRoles puprolesAdmin={puprolesAdmin} setPopupRolesAdmin={setPopupRolesAdmin}/>)}
            {editAdmin.show && (<EditAdmin setEditAdmin={setEditAdmin} editAdmin={editAdmin}/>)}
            {editrolesAdmin.show && (<EditAdminRoles editrolesAdmin={editrolesAdmin} setEditRolesAdmin={setEditRolesAdmin}/>)}


            {editPopups.show && (<EditUser editPopups={editPopups} setEditPopups={setEditPopups}/>)}
            {deleteUser.show && (<DeleteUser deleteUser={deleteUser} setDeleteUser={setDeleteUser}/>)}
            {Popuproles.show && (<UserRoles Popuproles={Popuproles} setPopupRoles={setPopupRoles}/>)}
            {editroles.show && (<EditRoles editroles={editroles} setEditRoles={setEditRoles}/>)}
            {deleteRoles.show && (<DeleteRoles deleteRoles={deleteRoles} setDeleteRoles={setDeleteRoles}/>)}


        </div>
    );
}

export default UserPage;
