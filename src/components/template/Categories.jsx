"use client";
import React, { useRef } from "react";
import Title from "@/components/template/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { images } from "@/utils/Users";
import CardImage from "@/components/module/CardImage";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Link from "next/link";

function Categories() {
    const swiperRef = useRef(null);

    return (
        <>
            <Title name="دسته بندی ها" />
            <div className="relative w-full  ">
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
                    modules={[FreeMode,Autoplay ]}
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
                                        className={`m-auto flex items-center justify-center  text-black transition-all duration-500 ${
                                            isActive
                                                ? "scale-100 translate-y-[-10px] duration-500 ring-2 ring-rose-500 rounded-t-full ring-offset-2 "
                                                : "scale-75 translate-y-[10px] duration-500"
                                        }`}
                                    >
                                        <CardImage data={image} />
                                    </div>
                                    <div className="text-black flex items-center justify-center mt-3">
                                        {image.text}
                                    </div>
                                </>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* دکمه "مشاهده همه" */}
                <div className=" hidden  md:flex text-white rounded-full flex  m-auto h-[48px] items-center justify-center mt-20 ml-10 bg-lime-700 w-[149px]">
                    <Link href="" className="ml-2">
                        مشاهده همه
                    </Link>
                    <FaAngleLeft color="white"/>
                </div>


                {/* دکمه‌های چپ و راست */}
                <div className="flex justify-center mt-10 md:-mt-10 space-x-2">
                    <button
                        onClick={() => swiperRef.current && swiperRef.current.slidePrev()}
                        className="m-5 border rounded-full bg-slate-200 border-2 border-black hover:shadow-lg hover:shadow-blue-200 transition-all duration-500 hover:scale-90  text-white p-3"
                    >
                        <FaAngleRight color="black" size={20} />
                    </button>
                    <button
                        onClick={() => swiperRef.current && swiperRef.current.slideNext()}
                        className="m-5 border rounded-full bg-slate-200 border-2  border-black hover:shadow-lg hover:shadow-blue-200 transition-all duration-500   hover:scale-90 text-white p-3"
                    >
                        <FaAngleLeft color="black" size={20} />
                    </button>
                </div>
            </div>
        </>
    );
}

export default Categories;

