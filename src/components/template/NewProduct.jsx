"use client";
import React from 'react';
import Title from "@/components/template/Title";
import {useGetProductsQuery} from "@/redux/apiSlice";
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper/modules";
import {FaAngleLeft} from "react-icons/fa6";
import {FaAngleRight} from "react-icons/fa";

function NewProduct(props) {
    const {data, error, isLoading} = useGetProductsQuery();

    // تقسیم داده‌ها به 3 ردیف هرکدام 8 آیتم
    const rows = Array.from({length: Math.ceil(data?.length / 24)}, (_, i) =>
        data?.slice(i * 24, i * 24 + 24) // 24 آیتم برای هر اسلاید (سه ردیف 8 تایی)
    );

    return (
        <>
            <Title name="جدیدترین ها"/>

            <div className="flex items-center justify-center m-auto ">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative flex flex-col justify-center items-center">
                            <div
                                className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
                            <Image src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
                                   className="rounded-full h-28 w-28" width={28} height={28} alt="icon"/>
                        </div>
                        <span className="text-black text-2xl mt-10">لطفا کمی صبر کنید </span>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-center m-auto ">
                {error && (
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative flex flex-col justify-center items-center">
                            <div
                                className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
                            <Image src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
                                   className="rounded-full h-28 w-28" width={28} height={28} alt="icon"/>
                        </div>
                        <span className="text-black text-2xl mt-10">خطا در سرور </span>
                    </div>
                )}
            </div>

            <div>
                <div className="relative w-full m-auto">
                    <Swiper
                        modules={[Navigation]}
                        autoplay={{delay: 3000, disableOnInteraction: false}}
                        loop={true}
                        navigation={{
                            nextEl: '.custom-next',
                            prevEl: '.custom-prev'
                        }}
                        className="mySwiper"
                    >
                        {rows.map((row, rowIndex) => (
                            <SwiperSlide key={rowIndex}>
                                <div className="container mx-auto p-4">
                                    <div className="grid grid-rows-3 ">
                                        {/* ایجاد ردیف‌ها و ستون‌ها با تکرار */}
                                        {[0, 8, 16].map((startIndex) => (
                                            <div key={startIndex} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 m-auto">
                                                {row.slice(startIndex, startIndex + 8).map((product, colIndex) => (
                                                    <div key={colIndex} className="flex justify-center">
                                                        <Image
                                                            src={product.image || "/images1235.png"}
                                                            alt={product.name || "img"}
                                                            width={180}
                                                            height={300}
                                                            layout="intrinsic" // حفظ نسبت ابعاد تصویر
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* دکمه‌های ناوبری */}
                    <button
                        className="custom-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full">
                        <FaAngleLeft size={50} color="black"/>
                    </button>
                    <button
                        className="custom-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full">
                        <FaAngleRight size={50} color="black"/>
                    </button>
                </div>
            </div>
        </>
    );
}

export default NewProduct;
