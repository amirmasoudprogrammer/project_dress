"use client";
import React, {useRef, useState} from "react";
import Title from "@/components/template/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { images } from "@/utils/Users";
import CardImage from "@/components/module/CardImage";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Link from "next/link";
import { motion } from "framer-motion";

function Categories() {
    const swiperRef = useRef(null);

    return (
        <>
            {/* عنوان با انیمیشن ورود از بالا */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <Title name="دسته بندی ها" />
            </motion.div>

            {/* کل اسلایدر با انیمیشن اسکرول */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="relative w-full ">
                    <Swiper
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        slidesPerView={2} // برای موبایل پیش‌فرض ۲ اسلاید
                        centeredSlides={true}
                        freeMode={true}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        modules={[FreeMode, Autoplay]}
                        className="mySwiper"
                        breakpoints={{
                            480: { slidesPerView: 2, spaceBetween: 10 }, // گوشی‌های کوچک
                            640: { slidesPerView: 3, spaceBetween: 15 }, // گوشی‌های متوسط
                            768: { slidesPerView: 3, spaceBetween: 15 }, // تبلت
                            1024: { slidesPerView: 5, spaceBetween: 20 }, // دسکتاپ
                        }}
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={image.id} className="transition-all duration-500 pt-16">
                                {({ isActive }) => (
                                    <>
                                        <div
                                            className={`m-auto flex items-center justify-center text-black transition-all duration-500 ${
                                                isActive
                                                    ? "scale-100 translate-y-[-10px] duration-500 ring-2 ring-rose-500 dark:ring-gray-600 rounded-t-full ring-offset-2 "
                                                    : "scale-75 translate-y-[10px] duration-500"
                                            }`}
                                        >
                                            <CardImage data={image} />
                                        </div>
                                        <div className="text-black flex items-center justify-center mt-3 dark:text-white">
                                            {image.text}
                                        </div>
                                    </>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* دکمه "مشاهده همه" */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="hidden md:flex text-white   rounded-full flex m-auto h-[48px] items-center justify-center mt-20 ml-10 bg-lime-700 w-[149px]"
                    >
                        <Link href="" className="ml-2 ">
                            مشاهده همه
                        </Link>
                        <FaAngleLeft color="white" />
                    </motion.div>

                    {/* دکمه‌های چپ و راست */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="flex justify-center mt-10 md:-mt-10 space-x-2"
                    >
                        <button
                            onClick={() => swiperRef.current && swiperRef.current.slidePrev()}
                            className="m-5 border rounded-full bg-slate-200 border-2 border-black hover:shadow-lg dark:hover:shadow-gray-600 hover:shadow-blue-200 transition-all duration-500 hover:scale-90 text-white p-3"
                        >
                            <FaAngleRight color="black" size={20} />
                        </button>
                        <button
                            onClick={() => swiperRef.current && swiperRef.current.slideNext()}
                            className="m-5 border rounded-full bg-slate-200 border-2 border-black hover:shadow-lg dark:hover:shadow-gray-600 hover:shadow-blue-200 transition-all duration-500 hover:scale-90 text-white p-3"
                        >
                            <FaAngleLeft color="black" size={20} />
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
}

export default Categories;
