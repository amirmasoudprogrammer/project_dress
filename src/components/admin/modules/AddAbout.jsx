"use client";
import React, { useState } from 'react';

function AddAbout({ onClose }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // اینجا می‌تونی درخواست axios برای اضافه کردن ارسال کنی
        console.log('متن جدید:', text);
        onClose(); // بستن پاپ‌آپ
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-center">➕ افزودن درباره ما</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="w-full border border-gray-300 rounded p-2 h-32 mb-4"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="متن جدید را وارد کنید..."
                        required
                    />
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            انصراف
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                        >
                            ذخیره
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddAbout;
