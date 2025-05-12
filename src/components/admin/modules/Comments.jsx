"use client";
import React, {useEffect, useState} from "react";
import {FaCheckCircle, FaEye, FaTimesCircle, FaTrashAlt} from "react-icons/fa";
import axios from "axios";
import {toast, Toaster} from "sonner";
import Cookies from "js-cookie";

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [filter, setFilter] = useState("همه");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('tokenAdmin');
                const res = await axios.get("https://joppin.ir/api/v1/comments/all",{
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                });
                setComments(res.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);


    const handleApprove = async (id) => {
        const form = new FormData()
        form.append("status", "approved")
        form.append("_method", "PATCH");

        try {
            const res = await axios.post(`https://joppin.ir/api/comments/${id}/status`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            })
            if (res.status) {
                toast.success("تایید شد ...");
            }
        } catch (e) {
            console.log(e)
        }

    };

    const handleReject = async (id) => {
        const form = new FormData()
        form.append("status", "rejected")
        form.append("_method", "PATCH");

        try {
            const res = await axios.post(`https://joppin.ir/api/comments/${id}/status`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            })
            if (res.status) {
                toast.success("رد شد ...");
            }
        } catch (e) {
            console.log(e)
        }
    };

    const handleDelete = async (id) => {

    };

    const filteredComments = comments.filter((comment) => {
        if (filter === "همه") return true;
        if (filter === "تایید شده") return comment.status === "approved";
        if (filter === "رد شده") return comment.status === "rejected";
        if (filter === "درحال انتظار") return comment.status === "pending";
        return true;
    });

    return (
        <div className="p-6 min-h-screen  from-purple-50 to-blue-100">
            <Toaster position="bottom-center" richColors/>
            <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-10">
                📝 مدیریت نظرات کاربران
            </h1>

            <div className="flex flex-wrap gap-3 mb-8 justify-center">
                {["همه", "تایید شده", "رد شده", "درحال انتظار"].map((label) => (
                    <button
                        key={label}
                        onClick={() => setFilter(label)}
                        className={`px-4 py-2 rounded-full border ${
                            filter === label
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-700"
                        } hover:bg-blue-100 hover:text-blue-800 transition-all duration-200 shadow-sm hover:shadow-md`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {filteredComments.length === 0 ? (
                <div className="text-center text-gray-500 mt-10 text-lg">
                    هیچ نظری یافت نشد.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {filteredComments.map((comment) => (
                        <div key={comment.id} className={`bg-white/60  backdrop-blur-md border border-white/30 shadow-xl rounded-3xl p-6 flex flex-col justify-between transition-all hover:scale-[1.01]`}>
                            <p className="text-gray-800 text-base mb-4 leading-relaxed">
                                {comment.comment}
                            </p>

                            <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                <span>
                  👤 توسط:{" "}
                    <span className="font-bold text-gray-700">
                    {comment.user_name || "کاربر"}
                  </span>
                </span>
                            </div>

                            <div className="text-xs text-gray-500 mb-2">
                                📅 تاریخ:{" "}
                                {new Date(comment.created_at).toLocaleDateString("fa-IR")}
                            </div>

                            <div className="text-xs text-blue-800 font-semibold mb-4">
                                وضعیت:{comment.status === "approved" ? "تایید شده" : comment.status === "rejected" ? "رد شده" : "در حال بررسی"}
                            </div>

                            <div className="flex justify-between gap-3 mt-auto">
                                <button onClick={() => handleApprove(comment.id)} className="flex-1 bg-green-100 hover:bg-green-200 text-green-800 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-1 transition"><FaCheckCircle/>تایید</button>
                                <button
                                    onClick={() => setSelectedComment(comment)}
                                    className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 rounded-xl text-[10px] font-medium flex items-center justify-center gap-1 transition"
                                >
                                    <FaEye />
                                    مشاهده
                                </button>

                                <button onClick={() => handleReject(comment.id)} className="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-1 transition"><FaTimesCircle/>رد</button>
                                <button onClick={() => handleDelete(comment.id)} className="flex-1 bg-red-100 hover:bg-red-200 text-red-800 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-1 transition"><FaTrashAlt/>حذف</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comments;
