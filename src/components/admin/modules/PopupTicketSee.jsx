"use client";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import axios from "axios";
import Cookies from "js-cookie";

function PopupTicketSee({ticketSee, setTicketSee}) {
    const [ticketData, setTicketData] = useState([]);
    const handleClose = () => {
        setTicketSee({show: false, id: null});
        setTicketData(null);
    };

    useEffect(() => {
        const fetchTicket = async () => {
            if (ticketSee.show && ticketSee.id) {
                try {
                    const token = Cookies.get('tokenAdmin');
                    const res = await axios.get(`https://joppin.ir/api/ticket/tickets/${ticketSee.id}`, {
                        headers: token ? {Authorization: `Bearer ${token}`} : {}
                    });
                    const data = res.data.data
                    setTicketData(data)
                } catch (err) {
                    console.error("خطا در دریافت اطلاعات تیکت", err);
                }
            }
        };

        fetchTicket();
    }, [ticketSee]);
    console.log(ticketData)



    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
                initial={{opacity: 0, y: -50}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -50}}
                className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md"
            >
                <h2 className="text-xl font-bold mb-4">مشاهده تیکت</h2>
                <p>شناسه تیکت: {ticketSee.id}</p>
                {ticketData && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded-xl shadow-sm">
                                <p className="text-sm text-gray-500">شماره تیکت</p>
                                <p className="font-bold">{ticketData.ticket_number}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-xl shadow-sm">
                                <p className="text-sm text-gray-500">دسته‌بندی</p>
                                <p className="font-bold">{ticketData.category?.name}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-xl shadow-sm">
                                <p className="text-sm text-gray-500">وضعیت</p>
                                <p className={`font-bold ${ticketData.status === 'open' ? 'text-green-600' : 'text-red-600'}`}>
                                    {ticketData.status === 'open' ? 'باز' : 'بسته'}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-xl shadow-sm">
                                <p className="text-sm text-gray-500">اولویت</p>
                                <p className="font-bold">
                                    {ticketData.priority === 'low' ? 'کم' :
                                        ticketData.priority === 'medium' ? 'متوسط' :
                                            ticketData.priority === 'high' ? 'زیاد' : ticketData.priority}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-xl shadow-sm col-span-2">
                                <p className="text-sm text-gray-500">تاریخ ایجاد</p>
                                <p className="font-bold">{new Date(ticketData.created_at).toLocaleString('fa-IR')}</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2">پیام‌ها</h3>
                            <div className="space-y-3 max-h-64 overflow-y-auto rounded-xl border p-3 bg-gray-50">
                                {ticketData.messages?.map((msg) => (
                                    <div key={msg.id} className="bg-white border p-3 rounded-lg shadow-sm">
                                        <div className="flex justify-between items-center mb-1">
              <span className={`text-sm font-medium ${msg.is_admin_response ? 'text-blue-600' : 'text-gray-700'}`}>
                {msg.is_admin_response ? 'پاسخ ادمین' : 'پیام کاربر'}
              </span>
                                            <span
                                                className="text-xs text-gray-400">{new Date(msg.created_at).toLocaleString('fa-IR')}</span>
                                        </div>
                                        <p className="text-gray-800 text-sm">{msg.message}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}


                <button
                    onClick={handleClose}
                    className="mt-6 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                >
                    بستن
                </button>
            </motion.div>
        </div>
    );
}

export default PopupTicketSee;
