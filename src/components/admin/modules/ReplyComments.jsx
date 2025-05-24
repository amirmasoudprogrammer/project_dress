"use client"
import React, {useEffect, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {IoMdClose} from "react-icons/io";
import Cookies from "js-cookie";
import axios from "axios";
import {toast} from "sonner";

const ReplyComments = ({replyComments, setReplyComments}) => {
    const [formData, setFormData] = useState({
        message: "",

    });
    const onClose = () => {
        setReplyComments({show: false, id: null})
    }

    const handleSubmit = async () => {
        try {
            const form = new FormData()
            form.append("comment", formData.message)
            const token = Cookies.get('tokenAdmin');
            const res = await axios.post(`https://joppin.ir/api/comments/${replyComments.id}/reply`, form, {
                headers: token ? {Authorization: `Bearer ${token}`} : {}
            })
            console.log(res)
            if (res.status === 201) {
                toast.success("پاسخ داده شد..");
                setFormData({
                    message: ""
                })
                setReplyComments({show: false, id: null})
            }
        } catch (error) {
            toast.error(error);
        }

    }


    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                <motion.div
                    className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative"
                    initial={{scale: 0.8, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    exit={{scale: 0.8, opacity: 0}}
                    transition={{type: "spring", stiffness: 300, damping: 25}}
                >

                    <button
                        onClick={onClose}
                        className="absolute top-4 left-4 text-gray-500 hover:text-red-500 transition"
                    >
                        <IoMdClose size={24}/>
                    </button>

                    <div>
                        <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">پاسخ به کامنت</h2>

                            <textarea
                                rows="5"
                                value={formData.message}
                                onChange={(e) =>
                                    setFormData((prev) => ({...prev, message: e.target.value}))
                                }
                                placeholder="متن پاسخ..."
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-4"
                            />


                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={handleSubmit}
                                    className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                                >
                                    ارسال پاسخ
                                </button>
                            </div>
                        </div>

                    </div>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ReplyComments;
