"use client";

import React, {useEffect, useState} from "react";
import {FaSearch, FaEye, FaReply, FaTrash} from "react-icons/fa";
import {useRouter} from "next/navigation";
import PopupTicketSee from "@/components/admin/modules/PopupTicketSee";
import Cookies from "js-cookie";
import axios from "axios";
import ReplyTicket from "@/components/admin/modules/ReplyTicket";


function TicketPage({data}) {
    const [tickets, setTickets] = useState(data.data);
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [ticketSee, setTicketSee] = useState({show: false, id: null})
    const [ticketReply, setTicketReply] = useState({show: false, id: null})
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('tokenAdmin');
                const res = await axios.get('https://joppin.ir/api/ticket/tickets', {
                    headers: token ? {Authorization: `Bearer ${token}`} : {}
                });
                setTickets(res.data.data || []);

            } catch (error) {
                console.error('خطا در گرفتن داده‌ها:', error);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);


    const startSee = (id) => {
        setTicketSee({show: true, id: id})
    }

    const handleCloseTicket = async (id) => {
        try {
            const token = Cookies.get('tokenAdmin');
            const res = await axios.post(`https://joppin.ir/api/ticket/tickets/${id}/close`, {
                headers: token ? {Authorization: `Bearer ${token}`} : {}
            });
            console.log(res)
        } catch (error) {
            console.log(error)
        }

    }

    const handleReopenTicket = async (id) => {
        try {
            const token = Cookies.get('tokenAdmin');
            const res = await axios.post(`https://joppin.ir/api/ticket/tickets/${id}/reopen`, {
                headers: token ? {Authorization: `Bearer ${token}`} : {}
            });
            console.log(res)
        } catch (error) {
            console.log(error)
        }

    }

    const startReply = (id) => {
        setTicketReply({show: true, id: id})
    }

    console.log(tickets)

    return (
        <div className="p-6 mt-20 max-w-6xl mx-auto">

            <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-10">
                📝 مدیریت تیکت‌ها
            </h1>

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div className="flex gap-2">
                    {["all", "باز", "پاسخ داده شده", "بسته"].map((item) => (
                        <button
                            key={item}
                            onClick={() => setFilter(item)}
                            className={`px-4 py-2 rounded-xl border text-sm transition ${
                                filter === item ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
                            }`}
                        >
                            {item === "all" ? "همه" : item}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="جستجو بر اساس عنوان یا نام کاربر"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 pr-10"
                    />
                    <FaSearch className="absolute top-3 right-3 text-gray-400"/>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tickets.map(ticket => (
                    <div key={ticket.id}
                         className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition">
                        <div className="flex w-full items-center justify-between">
                            <h3 className="font-semibold text-lg text-gray-800 mb-1">{ticket.title}</h3>
                            <div className="flex gap-2 items-center">
                                <button onClick={() => handleCloseTicket(ticket.id)}
                                        className="flex items-center gap-1 text-red-600 hover:text-red-800 text-xs px-3 py-1 rounded-xl border border-red-600 hover:bg-red-50 transition">
                                    <FaTrash className="text-sm"/>
                                    بستن تیکت
                                </button>
                                <button onClick={() => handleReopenTicket(ticket.id)}
                                        className="flex items-center gap-1 text-purple-600 hover:text-purple-800 text-xs px-3 py-1 rounded-xl border border-purple-600 hover:bg-purple-50 transition">
                                    <FaReply className="text-sm rotate-180"/>
                                    بازگشایی تیکت
                                </button>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">👤 {ticket.username}</p>
                        <p className="text-sm text-gray-600">📅 {new Date(ticket.created_at).toLocaleDateString("fa-IR")}</p>
                        <p className="text-sm mt-1">
                            وضعیت:
                            <span
                                className={`mr-1 px-2 py-0.5 rounded-xl text-white text-xs ${
                                    ticket.status === "open" ? "bg-yellow-500" : ticket.status === "closed" ? "bg-red-500" : "bg-blue-600"
                                }`}
                            >
                                {ticket.status}
                            </span>
                        </p>

                        <div className="flex gap-4 mt-4 text-sm text-blue-600">
                            <button
                                onClick={() => startSee(ticket.id)}
                                className="flex items-center gap-1 hover:text-blue-800"
                            >
                                <FaEye/> مشاهده
                            </button>
                            <button
                                onClick={() => startReply(ticket.id)}
                                className="flex items-center gap-1 text-green-600 hover:text-green-800">
                                <FaReply/> پاسخ
                            </button>

                        </div>
                    </div>
                ))}
            </div>

            {ticketSee.show && (
                <PopupTicketSee ticketSee={ticketSee} setTicketSee={setTicketSee}/>
            )}

            {ticketReply.show && (
                    <ReplyTicket ticketReply={ticketReply} setTicketReply={setTicketReply}/>
                )}
        </div>
    );
}

export default TicketPage;
