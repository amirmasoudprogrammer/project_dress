"use client";
import React from 'react';

function DiscountsMinMax({ price, setPrice }) {
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col gap-6 animate-fade-in">

                <h2 className="text-2xl font-extrabold text-center text-indigo-700">جزئیات مبلغ تخفیف</h2>

                <div className="flex flex-col gap-4 text-gray-700 text-sm">

                    {/* مبلغ مینیمم سفارش */}
                    <div className="flex items-center justify-between bg-gray-100 p-3 rounded-xl hover:bg-indigo-50 transition-all">
                        <span className="font-semibold text-gray-600">حداقل مبلغ سفارش:</span>
                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-xl">
                            {Number(price.item.min_order_amount).toLocaleString('fa-IR')} تومان
                        </span>
                    </div>

                    {/* حداکثر سقف تخفیف */}
                    <div className="flex items-center justify-between bg-gray-100 p-3 rounded-xl hover:bg-pink-50 transition-all">
                        <span className="font-semibold text-gray-600">حداکثر سقف تخفیف:</span>
                        <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-xl">
                            {Number(price.item.max_discount_amount).toLocaleString('fa-IR')} تومان
                        </span>
                    </div>

                </div>

                {/* دکمه بستن */}
                <button
                    onClick={() => setPrice({ show: false, item: null })}
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-all duration-300"
                >
                    بستن
                </button>

            </div>
        </div>
    );
}

export default DiscountsMinMax;
