"use client"
import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper/modules";
import Image from "next/image";
import {FaAngleLeft} from "react-icons/fa6";
import {FaAngleRight} from "react-icons/fa";
import Link from "next/link";

function BannerItem2(props) {
    return (
        <div className="relative w-full md:bottom-36 bottom-20  ">
            <Swiper
                modules={[Navigation, Autoplay]}
                autoplay={{delay: 3000, disableOnInteraction: false}}
                loop={true}
                navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev'
                }}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Link href="/Products" className="flex items-center">
                            <Image className="w-full h-auto object-cover" src="/unsplash_j5L0X1ioajw.png" alt="Slide 1"
                                   width={500} height={500}/>
                            <Image className="w-full h-auto object-cover" src="/unsplash_jRdXolKRYUU.png" alt="Slide 2"
                                   width={500} height={600}/>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href="/Products" className="flex items-center">
                            <Image className="w-full h-auto object-cover" src="/unsplash_j5L0X1ioajw.png" alt="Slide 1"
                                   width={500} height={500}/>
                            <Image className="w-full h-auto object-cover" src="/unsplash_jRdXolKRYUU.png" alt="Slide 2"
                                   width={500} height={500}/>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href="/Products" className="flex items-center">
                            <Image className="w-full h-auto object-cover" src="/unsplash_j5L0X1ioajw.png" alt="Slide 1"
                                   width={500} height={500}/>
                            <Image className="w-full h-auto object-cover" src="/unsplash_jRdXolKRYUU.png" alt="Slide 2"
                                   width={500} height={500}/>
                    </Link>
                </SwiperSlide>
            </Swiper>

            {/* دکمه‌های ناوبری */}
            <button className="custom-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10  p-2 rounded-full">
                <FaAngleLeft size={50} color="black"/>
            </button>
            <button className="custom-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10  p-2 rounded-full">
                <FaAngleRight size={50} color="black"/>
            </button>
        </div>
    );
}

export default BannerItem2;