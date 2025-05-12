"use client";
import React from 'react';

function DiscountsCategories({ setCategories, categories }) {
    const categoryList = categories.item.categories || [];

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col gap-6 animate-fade-in">

                <h2 className="text-2xl font-extrabold text-center text-indigo-700">دسته‌بندی‌های تخفیف</h2>

                {/* لیست دسته‌بندی‌ها */}
                <div className="flex flex-col gap-3">
                    {categoryList.length > 0 ? (
                        categoryList.map((item) => (
                            <div key={item.id} className="flex items-center justify-between bg-gray-100 p-3 rounded-xl hover:bg-indigo-50 transition-all">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-10 h-10 object-cover rounded-full border border-gray-300"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-700">{item.name}</span>
                                        <span className="text-xs text-gray-500">{item.description || "بدون توضیح"}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-400">دسته‌بندی‌ای وجود ندارد.</p>
                    )}
                </div>

                {/* دکمه بستن */}
                <button
                    onClick={() => setCategories({ show: false, item: null })}
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-all duration-300"
                >
                    بستن
                </button>

            </div>
        </div>
    );
}

export default DiscountsCategories;
