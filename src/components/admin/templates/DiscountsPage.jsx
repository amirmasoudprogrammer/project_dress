"use client";
import React, {useEffect, useState} from "react";
import {AiOutlineDollar} from "react-icons/ai";
import {CiCircleCheck} from "react-icons/ci";
import {TbClockHour2} from "react-icons/tb";
import {LuTicket} from "react-icons/lu";
import {FaPlus} from "react-icons/fa6";
import {IoIosSearch} from "react-icons/io";
import NamePages from "@/components/admin/modules/NamePages";
import axios from "axios";
import StatCard from "@/components/admin/modules/StatCard";
import TableCellDiscount from "@/components/admin/modules/TableCellDiscount";
import TableHeadDiscount from "@/components/admin/modules/TableHeadDiscount";
import PopupDiscounts from "@/components/admin/modules/PopupDiscounts";
import DiscountsCategories from "@/components/admin/modules/DiscountsCategories";
import DiscountsMinMax from "@/components/admin/modules/DiscountsMinMax";
import DiscountDelete from "@/components/admin/modules/DiscountDelete";
import {Toaster} from "sonner";
import Link from "next/link";
import EditPageDiscounts from "@/components/admin/templates/EditPageDiscounts";
import Cookies from "js-cookie";

function DiscountsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState('');
    const [discounts, setDiscounts] = useState([]);
    const [showDate, setShowDate] = useState({show: false, item: null});
    const [categories, setCategories] = useState({show: false, item: null});
    const [price, setPrice] = useState({show: false, item: null});
    const [popupDelete, setPopupDelete] = useState({show: false, id: null});
    const [popupEdit, setPopupEdit] = useState({show: false, item: null});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('tokenAdmin');
                const res = await axios.get('https://joppin.ir/api/v1/admin/discounts',{
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                });
                setDiscounts(res.data.data || []);
            } catch (error) {
                console.error('خطا در گرفتن داده‌ها:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    const startHand = (item) => {

        setShowDate({show: true, item: item})
    }

    const startCategories = (item) => {
        setCategories({show: true, item: item})
    }

    const startPrice = (item) => {
        setPrice({show: true, item: item})
    }

    const startDelete = (id) => {
        setPopupDelete({show: true, id: id})
    }

    const startEdit = (item) =>{
        setPopupEdit({show:true , item: item})
    }


    const filteredDiscounts = discounts.filter((item) => {
        const matchesStatus = status === ''
            || (status === 'فعال' && item.is_active)
            || (status === 'غیرفعال' && !item.is_active);

        const matchesSearch = searchTerm === ''
            || item.title.toLowerCase().includes(searchTerm.toLowerCase())
            || item.code.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesStatus && matchesSearch;
    });



    return (
        <div className="mt-28 z-10">
            <Toaster expand={true} position="bottom-center" richColors/>
            <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-10">
                💸 مدیریت تخفیف‌ها
            </h1>

            <div className="mt-5 flex items-center justify-between mx-8">
                <StatCard icon={<AiOutlineDollar/>} label="کل تخفیفات" color="text-blue-500" bg="bg-slate-300"/>
                <StatCard icon={<CiCircleCheck/>} label="فعال" color="text-green-500" bg="bg-green-200"/>
                <StatCard icon={<TbClockHour2/>} label="منقضی شده" color="text-yellow-400" bg="bg-yellow-100"/>
                <StatCard icon={<LuTicket/>} label="کد تخفیف" color="text-indigo-800" bg="bg-indigo-200"/>
            </div>

            <div className="mx-8 mt-5 flex items-center gap-4">
                <Link href="/Admin_Dashboard/Discounts/Add"
                      className="group bg-indigo-700 w-[160px] h-[36px] rounded text-white flex items-center justify-center hover:shadow-lg">
                    <FaPlus className="ml-2 group-hover:animate-pulse"/>
                    <span className="text-[13px]">ایجاد تخفیف جدید</span>
                </Link>

                <div className="flex items-center border border-slate-300 rounded h-[36px] px-2">
                    <IoIosSearch className="text-gray-400"/>
                    <input
                        type="text"
                        className="outline-0 border-0 pr-2 text-sm"
                        placeholder="جستجو تخفیف"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="text-slate-600 w-[170px] h-[36px] rounded border border-slate-400 text-sm"
                >
                    <option value="">وضعیت تخفیف</option>
                    <option value="">همه</option>
                    <option value="فعال">فعال</option>
                    <option value="غیرفعال">غیرفعال</option>
                </select>
            </div>


            <div className="overflow-x-auto rounded-xl shadow-md mt-6 mx-8">
                <table className="min-w-full bg-white text-right text-sm text-gray-700">
                    <thead className="bg-gray-100 font-bold">
                    <tr>
                        <TableHeadDiscount>عنوان</TableHeadDiscount>
                        <TableHeadDiscount>کد تخفیف</TableHeadDiscount>
                        <TableHeadDiscount>توضیحات</TableHeadDiscount>
                        <TableHeadDiscount>قیمت ها</TableHeadDiscount>
                        <TableHeadDiscount>درصد تخفیف</TableHeadDiscount>
                        <TableHeadDiscount>محدودیت کاربر</TableHeadDiscount>
                        <TableHeadDiscount>تاریخ</TableHeadDiscount>
                        <TableHeadDiscount>وضعیت</TableHeadDiscount>
                        <TableHeadDiscount>دسته‌بندی</TableHeadDiscount>
                        <TableHeadDiscount>عملیات</TableHeadDiscount>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredDiscounts.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50 transition duration-300 ">
                            <TableCellDiscount>{item.title}</TableCellDiscount>
                            <TableCellDiscount>{item.code}</TableCellDiscount>
                            <TableCellDiscount className="truncate max-w-[150px]">{item.description}</TableCellDiscount>
                            <td
                                onClick={() => startPrice(item)}
                                className="p-1 whitespace-nowrap text-[10px]  hover:text-red-600 cursor-pointer hover:font-bold"> اطلاعات
                                قیمت
                            </td>
                            <TableCellDiscount>{item.value}%</TableCellDiscount>
                            <TableCellDiscount>{item.user_usage_limit ?? "-"}</TableCellDiscount>
                            <td onClick={() => startHand(item)}
                                className="p-1 whitespace-nowrap text-[10px]  hover:text-red-600 cursor-pointer hover:font-bold"> اطلاعات
                                تاریخ
                            </td>

                            <TableCellDiscount>
                  <span
                      className={`px-2 py-1 rounded-full text-xs ${
                          item.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                  >
                    {item.is_active ? "فعال" : "غیرفعال"}
                  </span>
                            </TableCellDiscount>
                            <td onClick={() => startCategories(item)}
                                className="p-1 whitespace-nowrap text-[10px]  hover:text-red-600 cursor-pointer hover:font-bold">
                                اطلاعات دسته بندی
                            </td>
                            <TableCellDiscount>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => startEdit(item)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                        ویرایش
                                    </button>
                                    <button
                                        onClick={() => startDelete(item.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded">
                                        حذف
                                    </button>
                                </div>
                            </TableCellDiscount>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {
                popupEdit.show && (
                    <EditPageDiscounts popupEdit={popupEdit} setPopupEdit={setPopupEdit}/>
                )
            }


            {popupDelete.show && (
                <DiscountDelete popupDelete={popupDelete} setPopupDelete={setPopupDelete}/>
            )}

            {price.show && (
                <DiscountsMinMax price={price} setPrice={setPrice}/>
            )}

            {categories.show && (
                <DiscountsCategories categories={categories} setCategories={setCategories}/>
            )}
            {showDate.show && (
                <PopupDiscounts setShowDate={setShowDate} showDate={showDate}/>
            )}
        </div>
    );
}

export default DiscountsPage;

