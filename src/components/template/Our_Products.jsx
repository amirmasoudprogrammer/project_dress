"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Title from "@/components/template/Title";
import { useGetProductsQuery } from "@/redux/features/api/apiSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import CardProduct from "@/components/module/CardProduct";
import LoadingOrError from "@/components/module/LoadingOrError";

function OurProducts() {
    const [activeIndex, setActiveIndex] = useState(0);
    const { data, error, isLoading } = useGetProductsQuery();

    if (error) {
        return <LoadingOrError message="خطا در سرور" />;
    }

    const indicatorsCount = 5;

    return (
        <>
            {/* انیمیشن برای عنوان */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <Title name="محصولات ما" />
            </motion.div>

            {/* انیمیشن برای کل بخش */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative w-full mt-10"
            >
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
                            <SwiperSlide
                                key={item.id || index}
                                className="transition-all duration-500 mr-5 md:-mr-5 pt-16"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                >
                                    <CardProduct data={item} />
                                </motion.div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <p className="text-center mt-5">هیچ محصولی یافت نشد!</p>
                    )}
                </Swiper>

                {/* Indicators */}
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
            </motion.div>
        </>
    );
}

export default OurProducts;
