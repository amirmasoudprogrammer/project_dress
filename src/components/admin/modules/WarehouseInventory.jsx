import React from 'react';
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {useQuery} from '@tanstack/react-query';
import axios from "axios";
import Cookies from "js-cookie";

function WarehouseInventory({chartInventory, setChartInventory}) {
    const closeModal = () => setChartInventory(false);

    const {data, isLoading, error} = useQuery({
        queryKey: ['inventory-turnover'],
        queryFn: async () => {
            const token = Cookies.get('tokenAdmin');
            const res = await axios.get('https://joppin.ir/api/reports/inventory/turnover', {
                headers: token ? {Authorization: `Bearer ${token}`} : {}
            });
            return res.data
        },
        enabled: chartInventory,
    });

    const chartData = data?.data?.map(item => ({
        name: item.name,
        turnover: item.turnover_rate,
    }));

    // رنگ‌های مختلف برای بخش‌های چارت
    const COLORS = ['#6366f1', '#34d399', '#fbbf24', '#ef4444', '#60a5fa'];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    📊 نرخ گردش موجودی محصولات
                </h2>

                {isLoading && <p className="text-center text-gray-500">در حال بارگذاری...</p>}
                {error && <p className="text-red-500 text-center">خطا در دریافت داده</p>}

                {chartData && (
                    <div className="w-full h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="turnover"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="80%"
                                    innerRadius="60%" // تبدیل به چارت دایره‌ای (Donut)
                                    paddingAngle={5}
                                    stroke="#fff"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                    }}
                                    labelStyle={{fontWeight: 'bold'}}
                                    itemStyle={{fontSize: '14px'}}
                                />
                                <Legend layout="vertical" align="right" verticalAlign="middle"/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={closeModal}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                        بستن
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WarehouseInventory;
