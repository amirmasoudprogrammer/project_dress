import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function ReplyTicket({ ticketReply, setTicketReply }) {
    const [formData, setFormData] = useState({
        message: "",
        attachments: []
    });

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            attachments: Array.from(e.target.files)
        }));
    };

    const handleSubmit = async () => {
        try {
            const token = Cookies.get("tokenAdmin");
            const form = new FormData();
            form.append("message", formData.message);
            formData.attachments.forEach((file) => {
                form.append("attachments[]", file);
            });

            const res = await axios.post(
                `https://joppin.ir/api/ticket/tickets/${ticketReply.id}/reply`,
                form,
                {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : "",
                    }
                }
            );

            console.log("✅ پاسخ ارسال شد", res.data);
            setFormData({ message: "", attachments: [] });
            setTicketReply({ show: false, id: null });
        } catch (error) {
            console.error("❌ خطا در ارسال پاسخ", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-800">پاسخ به تیکت</h2>

                <textarea
                    rows="5"
                    value={formData.message}
                    onChange={(e) =>
                        setFormData((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="متن پاسخ..."
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-4"
                />

                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="mb-4 block w-full text-sm text-gray-600"
                />

                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setTicketReply({ show: false, id: null })}
                        className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 transition"
                    >
                        انصراف
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        ارسال پاسخ
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReplyTicket;
``
