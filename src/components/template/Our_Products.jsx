"use client";
import React, { useState } from "react";
import Title from "@/components/template/Title";
import { useGetProductsQuery } from "@/redux/apiSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import CardProduct from "@/components/module/CardProduct";
import LoadingOrError from "@/components/module/LoadingOrError";

function OurProducts() {
    const [activeIndex, setActiveIndex] = useState(0);
    const { data, error, isLoading } = useGetProductsQuery();

    // مدیریت حالت لودینگ و خطا
    if ( error) {
        return <LoadingOrError message={error && "خطا در سرور"} />;
    }

    // تعداد ثابت ۵ دکمه برای Indicator
    const indicatorsCount = 5;

    return (
        <>
            <Title name="محصولات ما" />

            <div className="relative w-full mt-10">
                <Swiper
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex % indicatorsCount)}
                    slidesPerView={2}
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
                        480: { slidesPerView: 1, spaceBetween: 10 },
                        640: { slidesPerView: 3, spaceBetween: 15 },
                        768: { slidesPerView: 3, spaceBetween: 15 },
                        1024: { slidesPerView: 5, spaceBetween: 20 },
                    }}
                >
                    {data && Array.isArray(data) && data.length > 0 ? (
                        data.map((item, index) => (
                            <SwiperSlide key={item.id || index} className="transition-all duration-500 mr-5 md:-mr-5 pt-16">
                                <CardProduct data={item} />
                            </SwiperSlide>
                        ))
                    ) : (
                        <p className="text-center mt-5">هیچ محصولی یافت نشد!</p>
                    )}
                </Swiper>

                {/* Indicators با ۵ دکمه */}
                <div className="flex justify-center mt-5 space-x-2">
                    {Array.from({ length: indicatorsCount }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`w-5 h-3 rounded-full transition-all duration-300 ${
                                index === activeIndex ? "bg-green-700 scale-125" : "bg-gray-300"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default OurProducts;
