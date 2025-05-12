"use client";
import React from 'react';

function PopupDiscounts({ showDate, setShowDate }) {
    const [startDate, startTime] = showDate.item.starts_at.split(' ');
    const [endDate, endTime] = showDate.item.expires_at.split(' ');

    const formattedStartDate = new Date(startDate).toLocaleDateString('fa-IR');
    const formattedEndDate = new Date(endDate).toLocaleDateString('fa-IR');

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md flex flex-col gap-6">

                <h2 className="text-2xl font-extrabold text-center text-indigo-700">جزئیات تخفیف</h2>

                <div className="flex flex-col gap-4 text-gray-700 text-sm">

                    <div className="flex items-center justify-between border-b pb-2">
                        <span className="font-semibold text-gray-600">شروع تخفیف:</span>
                        <div className="flex items-center gap-2">
                            <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-xl">
                                {formattedStartDate}
                            </span>
                            <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-xl">
                                {startTime.slice(0, 5)}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-b pb-2">
                        <span className="font-semibold text-gray-600">پایان تخفیف:</span>
                        <div className="flex items-center gap-2">
                            <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-xl">
                                {formattedEndDate}
                            </span>
                            <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-xl">
                                {endTime.slice(0, 5)}
                            </span>
                        </div>
                    </div>

                </div>

                <button
                    onClick={() => setShowDate({ show: false, item: null })}
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-xl transition-all duration-300"
                >
                    بستن
                </button>
            </div>
        </div>
    );
}

export default PopupDiscounts;
