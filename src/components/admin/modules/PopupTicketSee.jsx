"use client";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import axios from "axios";
import Cookies from "js-cookie";

function PopupTicketSee({ticketSee, setTicketSee}) {
    const [ticketData, setTicketData] = useState(null);
    const handleClose = () => {
        setTicketSee({show: false, id: null});
        setTicketData(null);
    };

    useEffect(() => {
        const fetchTicket = async () => {
            if (ticketSee.show && ticketSee.id) {
                try {
                    const token = Cookies.get('tokenAdmin');
                    const res = await axios.get(`https://joppin.ir/api/ticket/tickets/${ticketSee.id}`,{
                        headers: token ? { Authorization: `Bearer ${token}` } : {}
                    });
                    console.log(res)
                } catch (err) {
                    console.error("خطا در دریافت اطلاعات تیکت", err);
                }
            }
        };

        fetchTicket();
    }, [ticketSee]);



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
                {/* در اینجا اطلاعات کامل تیکت از API یا استیت کامل بارگذاری شود */}

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
