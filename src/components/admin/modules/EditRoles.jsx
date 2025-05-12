import React, {useState} from 'react';
import axios from "axios";
import {toast} from "sonner";

function EditRoles({setEditRoles, editroles}) {
    const closePopup = () => setEditRoles({show: false, id: null});
    const [role, setRole] = useState("")

    const startRoles = async () => {
        const form = new FormData();
        form.append("roles[]", role);
        form.append("_method", "PUT");

        try {
            const res = await axios.post(
                `https://joppin.ir/api/v1/users/${editroles.id}/roles`,
                form,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (res.status === 200) {
                toast.success(res.data.message || "نقش با موفقیت بروزرسانی شد");
                closePopup();
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "خطا در ذخیره نقش");
            console.error("خطا:", error.response?.data || error.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div
                className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col gap-6 animate-fade-in">

                <h2 className="text-xl md:text-2xl font-extrabold text-center text-indigo-700">اهدای نقش</h2>

                <div className="flex flex-col gap-4 text-gray-700 text-sm">
                    <div className="flex flex-col mt-1">
                        <label htmlFor="role" className="mb-1 text-[13px] text-gray-700 font-medium">
                            انتخاب نقش
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-[14px]"
                        >
                            <option value="user">کاربر (User)</option>
                            <option value="admin">مدیر (Admin)</option>
                            <option value="manager">مدیر میانی (Manager)</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={closePopup}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl text-sm transition-all duration-200"
                    >
                        بستن
                    </button>
                    <button
                        onClick={startRoles}
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm transition-all duration-200"
                    >
                        ذخیره نقش
                    </button>
                </div>

            </div>
        </div>
    );
}

export default EditRoles;