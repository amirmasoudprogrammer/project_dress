import React from 'react';
import {
    PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import Cookies from "js-cookie";

// رنگ‌های مختلف برای هر بخش از دایره
const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6', '#14b8a6', '#6366f1', '#f43f5e'];

function WarehouseProducts({ chartProduct, setChartProduct }) {
    const closeModal = () => setChartProduct(false);

    const { data, isLoading, error } = useQuery({
        queryKey: ['current-stock'],
        queryFn: async () => {
            const token = Cookies.get('tokenAdmin');
            const res = await axios.get('https://joppin.ir/api/reports/inventory/current-stock', {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            return res.data;
        },
        enabled: chartProduct,
    });

    const shorten = (str, max = 20) => str.length > max ? str.slice(0, max) + "…" : str;

    const chartData = data?.data?.map(item => ({
        name: shorten(item.name),
        fullName: item.name,
        value: item.total_stock,
    }));

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">نمودار دایره‌ای موجودی محصولات</h2>

                {isLoading && <p>در حال بارگذاری...</p>}
                {error && <p className="text-red-500">خطا در دریافت داده</p>}

                {chartData && (
                    <div className="w-full h-[400px]">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={140}
                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                                >
                                    {chartData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name, props) => [`${value} عدد`, props.payload.fullName]}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={closeModal}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        بستن
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WarehouseProducts;
