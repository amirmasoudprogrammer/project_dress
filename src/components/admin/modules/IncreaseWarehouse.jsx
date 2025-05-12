import React, {useState, useEffect} from 'react';
import axios from "axios";
import {toast} from "sonner";

function IncreaseWarehouse({setShowIncrease, showincrease}) {
    const [formData, setFormData] = useState({
        quantity: 0,
        reason: '',
        unit_cost: 0,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (showincrease.item) {
            setFormData({
                quantity: showincrease.item.stocks.map(item => item.quantity),
                reason: '',
                unit_cost: showincrease.item.cost_price || 0,
            });
        }
    }, [showincrease.item]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleIncrease = async () => {
        try {
            setLoading(true);

            const form = new FormData();
            form.append("quantity", formData.quantity);
            form.append("reason", formData.reason);
            form.append("unit_cost", formData.unit_cost);

            const res = await axios.post(`https://joppin.ir/api/inventory/${showincrease.item.id}/add-stock`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(res)
            if (res.status === 200) {
                toast.success(res.data.message);
                setShowIncrease({show: false, item: null})
                setFormData({
                    quantity: 0,
                    reason: '',
                    unit_cost: 0,
                })
            }


        } catch (err) {
            console.error('خطا در ثبت:', err);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-[400px] text-center relative">
                <button
                    onClick={() => setShowIncrease({show: false, item: null})}
                    className="absolute left-2 top-2 text-gray-600 hover:text-gray-900 text-2xl"
                >
                    ×
                </button>
                <h2 className="text-xl font-bold mb-4">افزودن محصول جدید</h2>
                <div className="flex flex-col gap-3">
                    <input
                        type="number"
                        name="unit_cost"
                        placeholder="قیمت خرید (Cost Price)"
                        className="border p-2 rounded outline-none"
                        value={formData.unit_cost ?? 0}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="تعداد (Quantity)"
                        className="border p-2 rounded outline-none"
                        value={formData.quantity ?? 0}
                        onChange={handleChange}
                    />
                    <textarea
                        name="reason"
                        placeholder="توضیحات (Reason)"
                        className="border p-2 rounded outline-none resize-none"
                        rows="3"
                        value={formData.reason ?? ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="mt-6 flex justify-center gap-3">
                    <button
                        onClick={handleIncrease}
                        className={`py-2 px-4 rounded text-white ${loading ? 'bg-indigo-400' : 'bg-indigo-700 hover:bg-indigo-800'}`}
                        disabled={loading}
                    >
                        {loading ? 'در حال ثبت...' : 'ثبت محصول'}
                    </button>
                    <button
                        onClick={() => setShowIncrease({show: false, item: null})}
                        className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
                    >
                        لغو
                    </button>
                </div>
            </div>
        </div>
    );
}

export default IncreaseWarehouse;

