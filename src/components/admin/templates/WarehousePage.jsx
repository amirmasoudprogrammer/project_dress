"use client";
import React, { useEffect, useState } from 'react';
import { IoIosSearch, IoIosClose } from "react-icons/io";
import { CiShop } from "react-icons/ci";
import { FaCircleCheck } from "react-icons/fa6";
import { FiAlertTriangle, FiPlus } from "react-icons/fi";import axios from "axios";
import Modal from "@/components/admin/modules/Modal";
import { Toaster } from "sonner";
import IncreaseWarehouse from "@/components/admin/modules/IncreaseWarehouse";
import DecreaseWarehouse from "@/components/admin/modules/DecreaseWarehouse";
import WarehouseProducts from "@/components/admin/modules/WarehouseProducts";
import WarehouseInventory from "@/components/admin/modules/WarehouseInventory";
import Cookies from "js-cookie";

function WarehousePage({ data = [] }) {
    const [status, setStatus] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [productData, setProductData] = useState(Array.isArray(data) ? data : []);
    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        sku: '',
        minimumQuantity: 0,
        costPrice: 0,
        sellingPrice: 0,
        description: '',
    });
    const [showincrease , setShowIncrease] = useState({show:false , item:null})
    const [showDecrease , setShowDecrease] = useState({show:false , item:null})
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const [chartProduct , setChartProduct] =useState(false)
    const [chartInventory , setChartInventory] =useState(false)



    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('tokenAdmin');
                const res = await axios.get('https://joppin.ir/api/inventory',{
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                });
                const result = res.data;

                if (Array.isArray(result)) {
                    setProductData(result);
                } else if (Array.isArray(result.data)) {
                    setProductData(result.data);
                } else {
                    console.error('داده‌ها آرایه نیستند:', result);
                    setProductData([]);
                }
            } catch (error) {
                console.error('خطا در گرفتن داده‌ها:', error);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleIncrease = (item) => {
        setShowIncrease({show: true ,item: item})
    };

    const handleDecrease = (item) => {
        setShowDecrease({show:true , item:item})
    };

    return (
        <div className="mt-28 z-10">
            <Toaster expand={true} position="bottom-center" richColors />
            <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-10">
                📦 مدیریت موجودی انبار
            </h1>



            <div className='mt-5 flex flex-wrap justify-around'>
                <div onClick={() =>setChartProduct(!chartProduct)}  className="flex items-center justify-center p-3 w-[200px] h-[70px] shadow-xl cursor-pointer border border-slate-200 rounded transition-all hover:shadow-sm">
                    <div className={`p-1 flex bg-slate-300 text-[20px] text-blue-500 rounded-full items-center justify-center w-[30px] h-[30px]`}>
                        <CiShop />
                    </div>
                    <span className="text-[12px] mr-2">کل محصولات</span>
                </div>
                <div onClick={() =>setChartInventory(!chartInventory)} className="flex items-center justify-center p-3 w-[200px] h-[70px] shadow-xl cursor-pointer border border-slate-200 rounded transition-all hover:shadow-sm">
                    <div className={`p-1 flex bg-green-200 text-[20px] text-green-500 rounded-full items-center justify-center w-[30px] h-[30px]`}>
                        <FaCircleCheck />
                    </div>
                    <span className="text-[12px] mr-2">موجود</span>
                </div>
                <div className="flex items-center justify-center p-3 w-[200px] h-[70px] shadow-xl cursor-pointer border border-slate-200 rounded transition-all hover:shadow-sm">
                    <div className={`p-1 flex bg-yellow-100 text-[20px] text-yellow-400 rounded-full items-center justify-center w-[30px] h-[30px]`}>
                        <FiAlertTriangle />
                    </div>
                    <span className="text-[12px] mr-2">کم موجود</span>
                </div>
                <div className="flex items-center justify-center p-3 w-[200px] h-[70px] shadow-xl cursor-pointer border border-slate-200 rounded transition-all hover:shadow-sm">
                    <div className={`p-1 flex bg-red-300 text-[20px] text-red-500 rounded-full items-center justify-center w-[30px] h-[30px]`}>
                        <IoIosClose />
                    </div>
                    <span className="text-[12px] mr-2">ناموجود</span>
                </div>
            </div>


            <div className="mr-8 mt-5 flex items-center justify-start">
                <div
                    onClick={openModal}
                    className="group text-white ml-3 mt-2 flex items-center justify-center cursor-pointer w-[160px] h-[30px] bg-indigo-700 rounded"
                >
                    <FiPlus />
                    <span className="group-hover:font-bold transition-all text-white mr-2 text-[13px]">افزودن در انبار</span>
                </div>

                <div className="mt-2 flex rounded border border-slate-300 h-[30px] items-center justify-around">
                    <IoIosSearch />
                    <input
                        type="text"
                        className="outline-0 border-0 pr-2"
                        placeholder="جستجو محصول"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <form className="flex">
                    <div className="flex flex-col mr-3">
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="text-slate-600 w-[220px] md:w-[170px] mt-2 h-[30px] outline-0 border border-slate-400 rounded"
                        >
                            <option value="">وضعیت موجودی</option>
                            <option value="موجود">موجود</option>
                            <option value="کم موجود">کم موجود</option>
                            <option value="ناموجود">ناموجود</option>
                        </select>
                    </div>
                </form>
            </div>


            <div className="overflow-x-auto rounded-xl shadow-md mt-6">
                <table className="min-w-full bg-white text-right text-sm text-gray-700">
                    <thead className="bg-gray-100 font-bold">
                    <tr>
                        <th className="p-4">محصول</th>
                        <th className="p-4">کد محصول</th>
                        <th className="p-4">حداقل موجودی</th>
                        <th className="p-4">موجودی در انبار</th>
                        <th className="p-4">رزرو شده</th>
                        <th className="p-4">وضعیت</th>
                        <th className="p-4">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {productData.length > 0 ? (
                        console.log(productData),
                        productData.map((item) => {
                            const stockCount = item.stocks.map(item => item.quantity) || 0;
                            const reservedCount = 0; // هنوز رزرو شده نداری
                            return (
                                <tr key={item.id || item.sku} className="border-b hover:bg-gray-50 transition duration-300">
                                    <td className="p-4">{item.name}</td>
                                    <td className="p-4">#{item.sku}</td>
                                    <td className="p-4">{item.minimum_quantity}</td>
                                    <td className="p-4">{stockCount}</td>
                                    <td className="p-4">{reservedCount}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">فعال</span>
                                    </td>
                                    <td className="p-4 flex flex-col gap-2">
                                        <button onClick={() => handleIncrease(item)} className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded">
                                            افزایش موجودی
                                        </button>
                                        <button onClick={() => handleDecrease(item)} className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">
                                            کاهش موجودی
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="7" className="p-4 text-center">
                                محصولی موجود نیست.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>


            <div className="mt-5">
                <span className="mr-8 text-[14px] font-normal">
                    نمایش 1 تا 5 از {productData.length} نتیجه
                </span>
            </div>


            {
                chartInventory && (
                    <WarehouseInventory setChartInventory={setChartInventory} chartInventory={chartInventory}/>
                )
            }

            {chartProduct && (
                <WarehouseProducts setChartProduct={setChartProduct} chartProduct={chartProduct}/>
            )}

            {showDecrease.show && (
                <DecreaseWarehouse showDecrease={showDecrease} setShowDecrease={setShowDecrease}/>
            )}

            {showincrease.show && (
                <IncreaseWarehouse setShowIncrease={setShowIncrease} showincrease={showincrease}/>
            )}

            {showModal && (
                <Modal closeModal={closeModal} setShowModal={setShowModal} newProduct={newProduct} setNewProduct={setNewProduct}/>)}
        </div>
    );
}

export default WarehousePage;
