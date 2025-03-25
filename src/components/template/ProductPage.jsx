"use client";
import React, { useState } from "react";
import { FiList } from "react-icons/fi";
import Title from "@/components/template/Title";
import { useGetProductsQuery } from "@/redux/features/api/apiSlice";
import CardProduct from "@/components/module/CardProduct";
import FilterPanel from "@/components/module/FilterPanel";
import Pagination from "@/components/module/Pagination";
import LoadingOrError from "@/components/module/LoadingOrError";
import { motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

function ProductPage() {
    const [showFilters, setShowFilters] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showCategoryItems, setShowCategoryItems] = useState(false); // استیت برای نمایش آیتم‌های دسته‌بندی در موبایل

    const toggleFilters = () => setShowFilters(!showFilters);
    const togglePopup = () => setShowPopup(!showPopup);
    const toggleCategoryItems = () => setShowCategoryItems(!showCategoryItems);

    const filterName = [
        { id: 1, name: "دسته بندی ها" },
        { id: 2, name: "جدیدترین" },
        { id: 3, name: "پرفروش ترین" },
        { id: 4, name: "ارزان ترین" },
        { id: 5, name: "گران ترین" },
    ];

    const { data, error, isLoading } = useGetProductsQuery();

    return (
        <>
            <div className="md:mt-10">
                {/* Mobile Title */}
                <div className="md:hidden -mt-28">
                    <Title name="محصولات ما" />
                </div>

                {/* Desktop Filters */}
                <div className="hidden md:flex container m-auto items-center border-b border-gray-300 pb-3">
                    <FiList className="text-black" />
                    <div className="flex items-center">
                        {filterName.map((filter) => (
                            <div
                                key={filter.id}
                                className="text-black mr-5 flex items-center cursor-pointer hover:text-[#6E8E59]"
                                onClick={filter.id === 1 ? togglePopup : null}
                            >
                                <span className="text-sm">{filter.name}</span>
                                {filter.id === 1 ? <FaAngleDown className="mr-2" /> : null}
                            </div>
                        ))}
                    </div>
                </div>

                {/* دسته‌بندی پاپ‌آپ در دسکتاپ */}
                {showPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-5 rounded-lg shadow-lg w-96">
                            <div className="flex items-center justify-between border-b border-[#626262] pb-2">
                                <h2 className="text-lg font-bold text-black">دسته بندی‌ها</h2>
                                <button onClick={togglePopup} className="text-black rounded hover:text-xl">
                                    <IoMdClose />
                                </button>
                            </div>
                            <div>
                                {["فرمالیته", "نامزدی", "عقد و عروسی", "لباس بله برون"].map((item, index) => (
                                    <div className="mt-5 text-[14px] cursor-pointer" key={index}>
                                        <span className="text-black font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Mobile Filters */}
                <div className="md:hidden container m-auto flex items-center">
                    <button
                        onClick={toggleFilters}
                        className="text-white bg-[#6E8E59] p-2 rounded-full flex items-center justify-center mr-8 shadow-md hover:bg-[#5a7e48] transition"
                    >
                        <FiList size={20} />
                    </button>

                    <FilterPanel
                        filterName={filterName}
                        showFilters={showFilters}
                        toggleFilters={toggleFilters}
                        showCategoryItems={showCategoryItems}
                        toggleCategoryItems={toggleCategoryItems}
                    />
                </div>

                {/* Animated Products */}
                <div className="flex items-center justify-center md:justify-start flex-wrap mt-10">
                    {(data || []).map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="flex flex-col w-[279px] mr-1 mt-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <CardProduct data={item} off="30" />
                        </motion.div>
                    ))}
                </div>

                <Pagination />
            </div>

            <div className="items-center flex justify-center">
                {isLoading && <LoadingOrError message="لطفا کمی صبر کنید" />}
                {error && <LoadingOrError message="خطا در سرور" />}
            </div>
        </>
    );
}

export default ProductPage;
