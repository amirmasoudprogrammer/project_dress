'use client';
import React from 'react';
import Title from "@/components/client/template/Title";
import { useGetProductsQuery } from "@/redux/features/api/apiSlice";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import LoadingOrError from "@/components/client/module/LoadingOrError";
import { motion } from "framer-motion";
import CardProductImage from "@/components/client/module/CardProductImage";

function NewProduct() {
    const { data, error, isLoading } = useGetProductsQuery();

    const products = data || []; // جلوگیری از کرش شدن در صورت نبود داده
    const rows = Array.from({ length: Math.ceil(products.length / 24) }, (_, i) =>
        products.slice(i * 24, i * 24 + 24)
    );
    const mobileRows = Array.from({ length: Math.ceil(products.length / 6) }, (_, i) =>
        products.slice(i * 6, i * 6 + 6)
    );

    return (
        <>
            {/* انیمیشن برای عنوان */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <Title name="جدیدترین ها" />
            </motion.div>

            <div className="items-center flex justify-center">
                {isLoading && <LoadingOrError message="لطفا کمی صبر کنید" />}
                {error && <LoadingOrError message="خطا در سرور" />}
            </div>

            {/* نسخه دسکتاپ */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative w-full m-auto hidden md:block"
            >
                <Swiper
                    modules={[Navigation, Autoplay]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
                    className="mySwiper"
                >
                    {rows.map((row, rowIndex) => (
                        <SwiperSlide key={rowIndex}>
                            <div className="container mx-auto p-4">
                                <div className="grid grid-rows-3">
                                    {[0, 8, 16].map((startIndex) => (
                                        <div key={startIndex} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
                                            {row.slice(startIndex, startIndex + 8).map((product, colIndex) => (
                                                <motion.div
                                                    key={colIndex}
                                                    initial={{ opacity: 0, y: 50 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.6, ease: "easeOut", delay: colIndex * 0.1 }}
                                                    viewport={{ once: true, amount: 0.2 }}
                                                    className="flex justify-center"
                                                >
                                                 <CardProductImage product={product} id={colIndex}/>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* دکمه‌های ناوبری */}
                <button className="custom-prev absolute bg-slate-200 left-20 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full">
                    <FaAngleLeft size={40} color="black" />
                </button>
                <button className="custom-next absolute bg-slate-200 right-20 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full">
                    <FaAngleRight size={40} color="black" />
                </button>
            </motion.div>

            {/* نسخه موبایل */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative w-full m-auto block md:hidden"
            >
                <Swiper
                    modules={[Navigation, Autoplay]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
                    className="mySwiper"
                >
                    {mobileRows.map((row, rowIndex) => (
                        <SwiperSlide key={rowIndex}>
                            <div className="container mx-auto p-4">
                                <div className="grid grid-cols-2">
                                    {[0, 1].map((colIndex) => (
                                        <div key={colIndex} className="grid grid-rows-3">
                                            {row.slice(colIndex * 3, colIndex * 3 + 3).map((product, rowIdx) => (
                                                <motion.div
                                                    key={rowIdx}
                                                    initial={{ opacity: 0, y: 50 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.6, ease: "easeOut", delay: rowIdx * 0.1 }}
                                                    viewport={{ once: true, amount: 0.2 }}
                                                    className="flex justify-center"
                                                >
                                                    <CardProductImage product={product} id={rowIdx}/>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* دکمه‌های ناوبری */}
                <button className="custom-prev absolute bg-slate-200 left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full">
                    <FaAngleLeft size={30} color="black" />
                </button>
                <button className="custom-next absolute bg-slate-200 right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full">
                    <FaAngleRight size={30} color="black" />
                </button>
            </motion.div>
        </>
    );
}

export default NewProduct;
