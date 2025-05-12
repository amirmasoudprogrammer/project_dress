import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import Cookies from "js-cookie";

function WarehouseProducts({ chartProduct, setChartProduct }) {
    const closeModal = () => setChartProduct(false);

    const { data, isLoading, error } = useQuery({
        queryKey: ['current-stock'],
        queryFn: async () => {
            const token = Cookies.get('tokenAdmin');
            const res = await axios.get('https://joppin.ir/api/reports/inventory/current-stock',{
                headers: token ? {Authorization: `Bearer ${token}`} : {}
            });

            return res.data;
        },
        enabled: chartProduct,
    });
    const chartData = data?.data?.map(item => ({
        name: item.name,
        stock: item.total_stock ,
    }));

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">نمودار موجودی محصولات</h2>

                {isLoading && <p>در حال بارگذاری...</p>}
                {error && <p className="text-red-500">خطا در دریافت داده</p>}

                {chartData && (
                    <div className="w-full h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <XAxis
                                    dataKey="name"
                                    angle={0}
                                    textAnchor="middle"
                                    interval={0}
                                />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="stock" fill="#10b981" />
                            </BarChart>
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
